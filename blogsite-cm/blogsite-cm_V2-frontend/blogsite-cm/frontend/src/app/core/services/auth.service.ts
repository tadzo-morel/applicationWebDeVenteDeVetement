import { Injectable, inject, signal, computed } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { ApiService } from './api.service';
import {
  JwtResponse,
  LoginRequest,
  RegisterRequest,
  UserSummary
} from '../models/auth.models';

const ACCESS_TOKEN_KEY = 'blogsite_access_token';
const REFRESH_TOKEN_KEY = 'blogsite_refresh_token';
const USER_KEY = 'blogsite_user';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private api = inject(ApiService);

  public readonly currentUser = signal<UserSummary | null>(this.loadUser());
  public readonly isAuthenticated = computed(() => this.currentUser() !== null);
  public readonly isAdmin = computed(
    () => this.currentUser()?.roles?.includes('ROLE_ADMIN') ?? false
  );

  register(req: RegisterRequest): Observable<JwtResponse> {
    return this.api.post<JwtResponse>('/auth/register', req).pipe(
      tap(res => this.persistSession(res))
    );
  }

  login(req: LoginRequest): Observable<JwtResponse> {
    return this.api.post<JwtResponse>('/auth/login', req).pipe(
      tap(res => this.persistSession(res))
    );
  }

  logout(): void {
    sessionStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    this.currentUser.set(null);
  }

  fetchCurrentUser(): Observable<UserSummary> {
    return this.api.get<UserSummary>('/auth/me').pipe(
      tap(user => {
        localStorage.setItem(USER_KEY, JSON.stringify(user));
        this.currentUser.set(user);
      })
    );
  }

  getAccessToken(): string | null {
    return sessionStorage.getItem(ACCESS_TOKEN_KEY);
  }

  private persistSession(res: JwtResponse): void {
    sessionStorage.setItem(ACCESS_TOKEN_KEY, res.accessToken);
    localStorage.setItem(REFRESH_TOKEN_KEY, res.refreshToken);
    localStorage.setItem(USER_KEY, JSON.stringify(res.user));
    this.currentUser.set(res.user);
  }

  private loadUser(): UserSummary | null {
    if (typeof localStorage === 'undefined') {
      return null;
    }
    const raw = localStorage.getItem(USER_KEY);
    if (!raw) {
      return null;
    }
    try {
      return JSON.parse(raw) as UserSummary;
    } catch {
      return null;
    }
  }
}
