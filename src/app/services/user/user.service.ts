// user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { apiConfig } from 'src/api-config';
import { User } from 'src/app/shared/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl: string = apiConfig.baseUrl;

  constructor(private http: HttpClient) {}

  listUsers(page: number, pageSize: number): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}${apiConfig.userActions}?page=${page}&pageSize=${pageSize}`);
  }

  updateUser(userId: string, user: User): Observable<User> {
    return this.http.put<User>(`${this.baseUrl}${apiConfig.userActions}/${userId}`, user);
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}${apiConfig.userActions}`, user);
  }

  deleteUser(userId: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}${apiConfig.userActions}/${userId}`);
  }
}
