import { Injectable } from '@angular/core';
import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { first, flatMap } from 'rxjs/operators';
import { AuthSelectors } from '../../store/services';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private authSelectors: AuthSelectors) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        return this.authSelectors.token$.pipe(
            first(),
            flatMap(token => {
                const authReq = !!token ? req.clone({
                    setHeaders: {Authorization: 'Bearer ' + token},
                }) : req;
                return next.handle(authReq);
            }),
        );
    }
}
