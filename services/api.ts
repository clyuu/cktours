const rawApiBaseUrl = String(import.meta.env.VITE_API_BASE_URL || '').trim();
const cleanedApiBaseUrl = rawApiBaseUrl.replace(/\/+$/, '');

const apiRoot = cleanedApiBaseUrl
  ? cleanedApiBaseUrl.endsWith('/api')
    ? cleanedApiBaseUrl
    : `${cleanedApiBaseUrl}/api`
  : '/api';

export const getApiUrl = (path: string): string => {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${apiRoot}${normalizedPath}`;
};

export const apiConfig = {
  apiRoot,
};
