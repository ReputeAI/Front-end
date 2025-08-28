export interface TokenPair {
  access_token: string;
  refresh_token: string;
  token_type?: string;
}

export interface UserMe {
  id: number;
  email: string;
  is_verified: boolean;
  memberships: {
    org_id: number;
    role: 'owner' | 'admin' | 'member' | 'viewer';
  }[];
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface UserCreate {
  email: string;
  password: string;
}

export interface SentimentRequest {
  text: string;
}

export interface SentimentResponse {
  label: string;
  confidence: number;
  aspects: string[];
}

export interface SuggestReplyRequest {
  review_id: number;
  tone?: string | null;
  language?: string | null;
}

export interface SuggestReplyResponse {
  suggestions: string[];
}

export interface ReplyCreate {
  text: string;
  is_auto?: boolean;
}

export interface ReplyOut {
  id: number;
  org_id: number;
  review_id: number;
  text: string;
  is_auto: boolean;
  status: string;
  platform_status?: string | null;
  posted_at?: string | null;
}

export interface UsageResponse {
  [k: string]: {
    [metric: string]: number;
  };
}

export interface Review {
  id: number;
  platform: string;
  reviewer?: string;
  rating: number;
  text: string;
  lang?: string;
  created_at: string;
  sentiment?: string;
}
