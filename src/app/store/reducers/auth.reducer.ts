import { Action, createReducer, on } from '@ngrx/store';
import * as AuthActions from '../actions';
import { User } from '../../core';

export interface AuthState {
    token: string | null;
    user: User | null;
    loading: boolean;
    error: string | null;
}

export const initialState: AuthState = {
    user: null,
    token: null,
    loading: false,
    error: null
};

export const authReducer = createReducer(
    initialState,
    on(AuthActions.loginSuccess, (state, {token}) => ({
        ...state, token,
        error: null,
        loading: false
    })),
    on(AuthActions.logout, (state) => ({
        ...state,
        loading: true,
    })),
    on(AuthActions.logoutSuccess, () => initialState),
    on(AuthActions.login, state => ({
        ...state,
        error: null,
        loading: true,
    })),

    on(AuthActions.loginFailure, (state, {error}) => ({
        ...state,
        error,
        loading: false,
    })),
    on(AuthActions.setToken, (state, {token}) => ({...state, token})),

    // Load user
    on(AuthActions.loadUser, state => ({
        ...state,
        error: null,
        loading: true,
    })),
    on(AuthActions.loadUserSuccess, (state, {user}) => ({
        ...state, user,
        error: null,
        loading: false
    })),
    on(AuthActions.loadUserFailure, (state, {error}) => ({
        ...state,
        error,
        loading: false,
    })),
);

export function reducer(state: AuthState | undefined, action: Action) {
    return authReducer(state, action);
}
