import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as AuthActions from '../../actions';
import { Credentials } from '../../../core/models';
import { EntityState } from '../../reducers';

@Injectable()
export class AuthDispatchers {
    constructor(private store: Store<EntityState>) {
    }

    login(credentials: Credentials) {
        this.store.dispatch(AuthActions.login({credentials}));
    }

    logout() {
        this.store.dispatch(AuthActions.logout());
    }

    loadUser() {
        this.store.dispatch(AuthActions.loadUser());
    }

    loginRequired() {
        this.store.dispatch(AuthActions.loginRedirect());
    }

    storeToken(token: string) {
        this.store.dispatch(AuthActions.setToken({token}));
    }
}
