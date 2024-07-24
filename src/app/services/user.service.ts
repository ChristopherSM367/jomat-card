import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from '../interfaces/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  private myappUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) { 
    this.myappUrl = environment.endpoint;
    this.myApiUrl = 'api/usuarios/';
  }

  private handleError(error: any) {
    console.error('An error occurred:', error);
    return throwError(error);
  }

  getListUser(): Observable<User[]> {
    return this.http.get<User[]>(this.myappUrl + this.myApiUrl)
      .pipe(
        catchError(this.handleError)
      );
  }

  getUserById(id: number): Observable<User> {
    const url = `${this.myappUrl}${this.myApiUrl}/${id}`;
    return this.http.get<User>(url)
      .pipe(
        catchError(this.handleError)
      );
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(this.myappUrl + this.myApiUrl + id)
      .pipe(
        catchError(this.handleError)
      );
  }

  saveUser(user: User): Observable<void>{
    return this.http.post<void>(this.myappUrl + this.myApiUrl, user)
      .pipe(
        catchError(this.handleError)
      );
  }

  getUser(id: number): Observable<User>{
    return this.http.get<User>(this.myappUrl + this.myApiUrl + id)
      .pipe(
        catchError(this.handleError)
      );
  }

  updateUser(id: number, user: User): Observable<void> {
    return this.http.put<void>(this.myappUrl + this.myApiUrl + id, user)
      .pipe(
        catchError(this.handleError)
      );
  }
}
