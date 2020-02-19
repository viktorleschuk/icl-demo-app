import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, concatMap, exhaustMap, map, switchMap, take, tap } from 'rxjs/operators';
import * as AuthActions from '../actions';
import { AuthService } from '../../auth/shared/auth.service';
import { AuthDispatchers } from '../services';

// import { LogoutConfirmationDialogComponent } from '@app/auth/components';

@Injectable()
export class AuthEffects {

    constructor(
        private actions$: Actions,
        private authService: AuthService,
        private router: Router,
        private authDispatchers: AuthDispatchers
    ) {
    }

    login$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.login),
            concatMap(action =>
                this.authService.login(action.credentials).pipe(
                    map(token => AuthActions.loginSuccess({token})),
                    catchError(error => of(AuthActions.loginFailure({error})))
                )
            )
        )
    );

    logout$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.logout),
            concatMap(action =>
                this.authService.logout().pipe(
                    map(response => AuthActions.logoutSuccess()),
                    catchError(error => of(error)))
                ),
            )
    );

    logoutSuccess$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(AuthActions.logoutSuccess),
                concatMap(action => {
                    this.authService.removeToken();
                    return this.router.navigate(['/login']);
                })
            ),
        {dispatch: false}
    );

    loginSuccess$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(AuthActions.loginSuccess),
                concatMap(action => {
                    this.authDispatchers.loadUser();
                    this.authService.saveToken(action.token);
                    return this.router.navigate(['/orders']);
                })
            ),
        {dispatch: false}
    );

    loginRedirect$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(AuthActions.loginRedirect),
                tap(authed => {
                    this.authService.removeToken();
                    this.router.navigate(['/login']);
                })
            ),
        {dispatch: false}
    );

    loadUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.loadUser),
            concatMap(action =>
                this.authService.loadUser().pipe(
                    map(user => AuthActions.loadUserSuccess({user})),
                    catchError(error => of(AuthActions.loadUserFailure({error})))
                )
            )
        )
    );

    loadUserFailure$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(AuthActions.loadUserFailure),
                map(action => AuthActions.loginRedirect())
            )
    );
}
