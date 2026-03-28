export interface StoredReview {
  id: number;
  tourId: string;
  tourName: string;
  customerName: string;
  rating: number;
  comment: string;
  visitedAt: string | null;
  createdAt: string;
}

interface NewStoredReview {
  tourId: string;
  tourName: string;
  customerName: string;
  rating: number;
  comment: string;
  visitedAt: string | null;
}

const STORAGE_KEY = 'cktours_reviews_v1';
const JSONBIN_BASE_URL = 'https://api.jsonbin.io/v3/b';
const REMOTE_REQUEST_TIMEOUT_MS = 7000;

const seedReviews: StoredReview[] = [];

let memoryReviews: StoredReview[] = [...seedReviews];

const sortByNewest = (items: StoredReview[]) =>
  [...items].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

const canUseLocalStorage = () => typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';

const getEnvValue = (key: string): string => {
  if (typeof import.meta === 'undefined' || !import.meta.env) {
    return '';
  }

  const value = import.meta.env[key as keyof ImportMetaEnv];
  if (typeof value !== 'string') {
    return '';
  }

  const trimmed = value.trim();
  if (
    (trimmed.startsWith("'") && trimmed.endsWith("'")) ||
    (trimmed.startsWith('"') && trimmed.endsWith('"'))
  ) {
    return trimmed.slice(1, -1).trim();
  }

  return trimmed;
};

const getJsonBinConfig = () => {
  const binId = getEnvValue('VITE_JSONBIN_BIN_ID');
  const apiKey = getEnvValue('VITE_JSONBIN_API_KEY');
  const accessKey = getEnvValue('VITE_JSONBIN_ACCESS_KEY');

  return {
    enabled: Boolean(binId),
    binId,
    apiKey,
    accessKey,
  };
};

const getJsonBinHeaders = (withContentType = false): Record<string, string> => {
  const config = getJsonBinConfig();
  const headers: Record<string, string> = {};

  if (config.apiKey) {
    headers['X-Master-Key'] = config.apiKey;
  }

  if (config.accessKey) {
    headers['X-Access-Key'] = config.accessKey;
  }

  if (withContentType) {
    headers['Content-Type'] = 'application/json';
  }

  return headers;
};

const withTimeout = async <T>(operation: Promise<T>, timeoutMs: number): Promise<T> => {
  return new Promise<T>((resolve, reject) => {
    const timeoutId = window.setTimeout(() => reject(new Error('Request timeout')), timeoutMs);

    operation
      .then((result) => {
        window.clearTimeout(timeoutId);
        resolve(result);
      })
      .catch((error: unknown) => {
        window.clearTimeout(timeoutId);
        reject(error);
      });
  });
};

const parseRemotePayload = (value: unknown): StoredReview[] => {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .filter((item) => typeof item === 'object' && item !== null)
    .map((item) => item as Partial<StoredReview>)
    .filter((item) => {
      return (
        typeof item.id === 'number' &&
        typeof item.tourId === 'string' &&
        typeof item.tourName === 'string' &&
        typeof item.customerName === 'string' &&
        typeof item.rating === 'number' &&
        typeof item.comment === 'string' &&
        (typeof item.visitedAt === 'string' || item.visitedAt === null || typeof item.visitedAt === 'undefined') &&
        typeof item.createdAt === 'string'
      );
    })
    .map((item) => ({
      id: item.id as number,
      tourId: item.tourId as string,
      tourName: item.tourName as string,
      customerName: item.customerName as string,
      rating: item.rating as number,
      comment: item.comment as string,
      visitedAt: item.visitedAt ?? null,
      createdAt: item.createdAt as string,
    }));
};

const fetchRemoteReviews = async (): Promise<StoredReview[] | null> => {
  const config = getJsonBinConfig();
  if (!config.enabled) {
    return null;
  }

  const endpoint = `${JSONBIN_BASE_URL}/${config.binId}/latest`;
  const response = await withTimeout(
    fetch(endpoint, {
      method: 'GET',
      headers: getJsonBinHeaders(),
    }),
    REMOTE_REQUEST_TIMEOUT_MS
  );

  if (!response.ok) {
    throw new Error(`Failed to load shared reviews (${response.status})`);
  }

  const data = (await response.json()) as { record?: unknown };
  const record = data.record;

  if (Array.isArray(record)) {
    return parseRemotePayload(record);
  }

  if (record && typeof record === 'object' && 'reviews' in record) {
    const nested = (record as { reviews?: unknown }).reviews;
    return parseRemotePayload(nested);
  }

  return [];
};

const saveRemoteReviews = async (reviews: StoredReview[]): Promise<void> => {
  const config = getJsonBinConfig();
  if (!config.enabled) {
    return;
  }

  const endpoint = `${JSONBIN_BASE_URL}/${config.binId}`;
  const response = await withTimeout(
    fetch(endpoint, {
      method: 'PUT',
      headers: getJsonBinHeaders(true),
      body: JSON.stringify({ reviews }),
    }),
    REMOTE_REQUEST_TIMEOUT_MS
  );

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error('Failed to save shared review (401). Please verify your JSONBin API/Access key.');
    }

    if (response.status === 400) {
      throw new Error('Failed to save shared review (400). JSONBin rejected the payload format.');
    }

    throw new Error(`Failed to save shared review (${response.status})`);
  }
};

const syncFromLocalStorage = () => {
  if (!canUseLocalStorage()) {
    return;
  }

  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    memoryReviews = [...seedReviews];
    return;
  }

  try {
    const parsed = JSON.parse(raw) as StoredReview[];
    if (Array.isArray(parsed)) {
      memoryReviews = parsed;
    }
  } catch {
    memoryReviews = [...seedReviews];
  }
};

const saveToLocalStorage = () => {
  if (!canUseLocalStorage()) {
    return;
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(memoryReviews));
};

export const getStoredReviews = async (): Promise<StoredReview[]> => {
  syncFromLocalStorage();

  try {
    const remoteReviews = await fetchRemoteReviews();
    if (remoteReviews) {
      memoryReviews = sortByNewest(remoteReviews);
      saveToLocalStorage();
    }
  } catch (error) {
    console.warn('Using local reviews because shared source is unavailable.', error);
  }

  return sortByNewest(memoryReviews);
};

export const addStoredReview = async (payload: NewStoredReview): Promise<StoredReview> => {
  syncFromLocalStorage();

  const config = getJsonBinConfig();
  if (config.enabled) {
    try {
      const remoteReviews = await fetchRemoteReviews();
      if (remoteReviews) {
        memoryReviews = sortByNewest(remoteReviews);
      }
    } catch (error) {
      console.warn('Could not refresh shared reviews before submit.', error);
    }
  }

  const nextId = memoryReviews.length ? Math.max(...memoryReviews.map((r) => r.id)) + 1 : 1;
  const review: StoredReview = {
    id: nextId,
    tourId: payload.tourId,
    tourName: payload.tourName,
    customerName: payload.customerName,
    rating: payload.rating,
    comment: payload.comment,
    visitedAt: payload.visitedAt,
    createdAt: new Date().toISOString(),
  };

  memoryReviews = [review, ...memoryReviews];

  if (config.enabled) {
    try {
      await saveRemoteReviews(memoryReviews);
    } catch (error) {
      memoryReviews = memoryReviews.filter((item) => item.id !== review.id);
      throw error instanceof Error ? error : new Error('Unable to submit your review right now.');
    }
  }

  saveToLocalStorage();

  return review;
};

export const isSharedReviewModeEnabled = (): boolean => getJsonBinConfig().enabled;
