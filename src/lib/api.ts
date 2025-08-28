import axios, { AxiosInstance } from 'axios';

export function createAxios(): AxiosInstance {
  const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
  const instance = axios.create({
    baseURL,
    timeout: 20000,
    withCredentials: true,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  });

  instance.interceptors.request.use(async (config) => {
    const { useAuthStore } = await import('../stores/auth');
    const auth = useAuthStore();

    const token = auth.accessToken;
    const orgId = auth.orgId;

    config.headers = config.headers || {};
    config.headers['Content-Type'] = 'application/json';

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    if (orgId) {
      config.headers['X-Org-Id'] = String(orgId);
    }

    return config;
  });

  instance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const { response, config } = error;

      if (response?.status === 401 && !config.__isRetry) {
        config.__isRetry = true;
        const { useAuthStore } = await import('../stores/auth');
        const auth = useAuthStore();
        try {
          await auth.refresh();
          if (auth.accessToken) {
            config.headers = config.headers || {};
            config.headers['Authorization'] = `Bearer ${auth.accessToken}`;
          }
          return instance(config);
        } catch (refreshError) {
          await auth.logout();
          const router = (await import('../router')).default;
          router.push('/login');
          return Promise.reject(refreshError);
        }
      }

      return Promise.reject(error);
    }
  );

  return instance;
}

export const api = createAxios();

