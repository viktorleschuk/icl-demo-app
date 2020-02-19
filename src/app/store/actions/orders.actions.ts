import { createAction, props } from '@ngrx/store';
import { IndexParams, OrdersResponse } from '../../core';

export const load = createAction('[Orders] Load', props<{ payload: IndexParams }>());
export const loadSuccess = createAction('[Orders] Load Success', props<{ payload: OrdersResponse }>());
export const loadFailure = createAction('[Orders] Load Failure', props<{ error: any }>());

export const storeClear = createAction('[Orders] Store Clear');
