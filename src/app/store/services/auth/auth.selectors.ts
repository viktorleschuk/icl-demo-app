import { Injectable } from '@angular/core';
import { Store, createSelector, createFeatureSelector } from '@ngrx/store';
import { tap } from 'rxjs/operators';

import { EntityState } from '../../reducers';
import { AuthState } from '../../reducers/auth.reducer';

const getEntityState = createFeatureSelector<EntityState>('entityCache');

const getAuthState = createSelector(
    getEntityState,
    (state: EntityState) => state.auth
);

export const getUser = createSelector(
    getAuthState,
    (state: AuthState) => state.user
);

export const getToken = createSelector(
    getAuthState,
    (state: AuthState) => state.token
);

export const getLoggedIn = createSelector(
    getToken,
    token => !!token
);

export const getError = createSelector(
    getAuthState,
    (state: AuthState) => state.error
);
export const getLoading = createSelector(
    getAuthState,
    (state: AuthState) => state.loading
);

@Injectable()
export class AuthSelectors {
    constructor(private store: Store<EntityState>) {
    }

    // selectors$
    user$ = this.store.select(getUser);
    token$ = this.store.select(getToken);
    loggedIn$ = this.store.select(getLoggedIn);
    error$ = this.store.select(getError);
    loading$ = this.store.select(getLoading);
}
