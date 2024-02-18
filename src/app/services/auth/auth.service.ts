import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthSuccessResponse, AuthErrorResponse } from 'src/app/shared/models/models';
import { environment } from 'src/environments/environment';
import { User } from 'src/app/shared/models/user.model';
import { Router } from '@angular/router';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { apiConfig } from 'src/api-config';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl: string = apiConfig.baseUrl;
  private authTokenKey = 'authToken';


  constructor(
    private http: HttpClient,
    private errorHandler: ErrorHandlerService,
    private router: Router
  ) { }

  login(credentials: { username: string, password: string }): Observable<AuthSuccessResponse | AuthErrorResponse> {
    return this.http.post<AuthSuccessResponse | AuthErrorResponse>(`${this.baseUrl}${apiConfig.login}`, credentials).pipe(
      catchError(this.errorHandler.handleError)
    );
  }

  signup(userData: any): Observable<AuthSuccessResponse | AuthErrorResponse> {
    return this.http.post<AuthSuccessResponse | AuthErrorResponse>(`${this.baseUrl}${apiConfig.register}`, userData).pipe(
      catchError(this.errorHandler.handleError)
    );
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}${apiConfig.userActions}`).pipe(
      catchError(this.errorHandler.handleError)
    );
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem(this.authTokenKey);
  }

  setAuthToken(token: string): void {
    localStorage.setItem(this.authTokenKey, token);
  }

  getAuthToken(): string | null {
    return localStorage.getItem(this.authTokenKey);
  }

  clearAuthToken(): void {
    localStorage.removeItem(this.authTokenKey);
  }
  logout(): void {
    this.clearAuthToken();
    this.router.navigate(['/login']);
  }
}
