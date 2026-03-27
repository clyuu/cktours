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

const seedReviews: StoredReview[] = [];

let memoryReviews: StoredReview[] = [...seedReviews];

const sortByNewest = (items: StoredReview[]) =>
  [...items].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

const canUseLocalStorage = () => typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';

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

export const getStoredReviews = (): StoredReview[] => {
  syncFromLocalStorage();
  return sortByNewest(memoryReviews);
};

export const addStoredReview = (payload: NewStoredReview): StoredReview => {
  syncFromLocalStorage();

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
  saveToLocalStorage();

  return review;
};
