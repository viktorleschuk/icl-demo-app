import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError, Observable } from 'rxjs';
import { catchError, delay, map } from 'rxjs/operators';
import { Credentials, User } from '../../core';
import { environment } from '../../../environments/environment';

@Injectable()
export class AuthService {
    protected oauthTokenName = 'token';

    constructor(private http: HttpClient) {
    }

    check(): boolean {
        return localStorage.getItem(this.oauthTokenName) != null;
    }

    token(): string {
        return localStorage.getItem(this.oauthTokenName);
    }

    saveToken(token: string): void {
        localStorage.setItem(this.oauthTokenName, token);
    }

    removeToken(): void {
        localStorage.removeItem(this.oauthTokenName);
    }

    login(credentials: Credentials): Observable<string> {

        return this.http.post(`${environment.apiUrl}/auth/login`, credentials).pipe(
            map((response: any) => response.token),
            catchError(this.handleError())
        );
    }

    logout(): Observable<any> {

        return this.http.post(`${environment.apiUrl}/auth/logout`,  {}).pipe(
            map((response: any) => response),
            catchError(this.handleError())
        );
    }

    loadUser(): Observable<User> {

        return this.http.get(`${environment.apiUrl}/auth/user`).pipe(
            map((response: any) => response.user),
            catchError(this.handleError())
        );
    }

    private handleError<T>() {
        return (res: HttpErrorResponse) => {
            return throwError(res.error.message || 'Something went wrong');
        };
    }
}
