import { computed, inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';
import { environment } from '../../environments/environment';

export interface AuthResponse {
  token: string;
  email: string;
  role: 'Admin' | 'User';
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private readonly TOKEN_KEY = 'jwt_token';
  private readonly ROLE_KEY = 'user_role';

  // Reactive signals for the authentication state
  public currentRole = signal<'Admin' | 'User'>((localStorage.getItem(this.ROLE_KEY) as 'Admin' | 'User') || 'Admin');
  public token = signal<string | null>(localStorage.getItem(this.TOKEN_KEY));
  public isAdmin = computed(() => this.currentRole() === 'Admin');
  public isUser = computed(() => this.currentRole() === 'User');

  public switchRole(role: 'Admin' | 'User') {
    return this.http.post<AuthResponse>(`${environment.apiUrl}/auth/demo-token?role=${role}`, {}).pipe(
      tap((res) => {
        localStorage.setItem(this.TOKEN_KEY, res.token);
        localStorage.setItem(this.ROLE_KEY, res.role);
        this.token.set(res.token);
        this.currentRole.set(res.role);
      })
    );
  }

  public getToken(): string | null {
    return this.token();
  }
}
