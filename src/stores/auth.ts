import { defineStore } from 'pinia';
import { api } from '../lib/api';

interface Membership {
  org_id: number;
  [key: string]: any;
}

export interface UserMe {
  memberships?: Membership[];
  [key: string]: any;
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    accessToken: sessionStorage.getItem('accessToken') as string | null,
    refreshInFlight: false,
    me: null as UserMe | null,
    orgId: sessionStorage.getItem('orgId')
      ? Number(sessionStorage.getItem('orgId'))
      : null
  }),
  getters: {
    isAuthed: (state) => !!state.accessToken
  },
  actions: {
    async login(email: string, password: string) {
      const { data } = await api.post('/auth/login', { email, password });
      this.accessToken = data.access_token;
      sessionStorage.setItem('accessToken', this.accessToken);
      await this.fetchMe();
    },
    async register(email: string, password: string) {
      const { data } = await api.post('/auth/register', { email, password });
      this.accessToken = data.access_token;
      sessionStorage.setItem('accessToken', this.accessToken);
      await this.fetchMe();
    },
    async logout() {
      const headers = this.accessToken
        ? { Authorization: `Bearer ${this.accessToken}` }
        : {};
      await api.post('/auth/logout', {}, { headers });
      this.accessToken = null;
      this.me = null;
      this.orgId = null;
      sessionStorage.removeItem('accessToken');
      sessionStorage.removeItem('orgId');
    },
    async refresh() {
      if (this.refreshInFlight) return;
      this.refreshInFlight = true;
      try {
        const headers = this.accessToken
          ? { Authorization: `Bearer ${this.accessToken}` }
          : {};
        const { data } = await api.post(
          '/auth/refresh',
          {},
          { headers, withCredentials: true }
        );
        this.accessToken = data.access_token;
        sessionStorage.setItem('accessToken', this.accessToken);
      } finally {
        this.refreshInFlight = false;
      }
    },
    async fetchMe() {
      if (!this.accessToken) return;
      const { data } = await api.get('/me', {
        headers: { Authorization: `Bearer ${this.accessToken}` }
      });
      this.me = data;
      if (data?.memberships?.[0] && this.orgId === null) {
        this.orgId = data.memberships[0].org_id;
        sessionStorage.setItem('orgId', String(this.orgId));
      }
    },
    setOrg(id: number) {
      this.orgId = id;
      sessionStorage.setItem('orgId', String(id));
    }
  }
});
