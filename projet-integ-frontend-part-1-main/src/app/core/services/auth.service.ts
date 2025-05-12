import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { User, AuthResponse } from '../models/user.model';
import { NavService } from './nav.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  private apiUrl = `${environment.apiUrl}/users`;

  currentUser$ = this.currentUserSubject.asObservable();
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(
    private http: HttpClient,
    private navService: NavService,
    private router: Router
  ) {
    this.checkAuthStatus();
  }

  // ✅ Load user from localStorage
  checkAuthStatus(): void {
    const user = this.getUserFromStorage();
    if (user) {
      this.currentUserSubject.next(user);
      this.isAuthenticatedSubject.next(true);
    } else {
      this.currentUserSubject.next(null);
      this.isAuthenticatedSubject.next(false);
    }
  }

  // ✅ Login
  login(email: string, password: string): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/login`, { email, password }).pipe(
      tap(user => {
        this.saveUser(user);
        this.navService.navigateToHome();
      }),
      catchError(error => {
        console.error('Login error:', error);
        throw error;
      })
    );
  }

  // ✅ Register
  register(userData: { nom: string; email: string; password: string }): Observable<User>
{
    return this.http.post<User>(`${this.apiUrl}`, userData).pipe(
      tap(user => {
        this.saveUser(user);
        this.navService.navigateToHome();
      }),
      catchError(error => {
        console.error('Register error:', error);
        throw error;
      })
    );
  }

  // ✅ Save user to localStorage
  private saveUser(user: User): void {
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUserSubject.next(user);
    this.isAuthenticatedSubject.next(true);
  }

  // ✅ Logout
  logout(): void {
    localStorage.removeItem('user');
    this.currentUserSubject.next(null);
    this.isAuthenticatedSubject.next(false);
    this.navService.navigateToLogin();
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  private getUserFromStorage(): User | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
}