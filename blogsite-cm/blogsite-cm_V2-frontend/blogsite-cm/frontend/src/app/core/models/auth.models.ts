export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email?: string;
  phone: string;
  password: string;
  preferredLocale?: 'fr-CM' | 'en-CM';
}

export interface LoginRequest {
  identifier: string;
  password: string;
}

export interface JwtResponse {
  accessToken: string;
  refreshToken: string;
  tokenType: string;
  expiresInMs: number;
  user: UserSummary;
}

export interface UserSummary {
  id: number;
  firstName: string;
  lastName: string;
  email: string | null;
  phone: string;
  preferredLocale: string;
  roles: string[];
}

export interface ApiError {
  timestamp: string;
  status: number;
  error: string;
  message: string;
  path: string;
  details?: { field: string; message: string }[];
}
