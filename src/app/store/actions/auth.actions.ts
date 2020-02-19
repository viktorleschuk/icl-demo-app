import { createAction, props } from '@ngrx/store';
import { Credentials, User } from '../../core';

export const login = createAction('[Auth] Login', props<{ credentials: Credentials }>());
export const loginSuccess = createAction('[Auth] Login Success', props<{ token: string }>());
export const loginFailure = createAction('[Auth] Login Failure', props<{ error: any }>());
export const loginRedirect = createAction('[Auth] Login Redirect');

export const logout = createAction('[Auth] Logout');
export const logoutSuccess = createAction('[Auth] Logout Success');

export const loadUser = createAction('[Auth] Load User');
export const loadUserSuccess = createAction('[Auth] Load User Success', props<{ user: User }>());
export const loadUserFailure = createAction('[Auth] Load User Failure', props<{ error: any }>());

export const setToken = createAction('[Auth] Set Token', props<{ token: string }>());
