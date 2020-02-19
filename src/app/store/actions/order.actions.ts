import { createAction, props } from '@ngrx/store';
import { Order, Product } from '../../core';

export const loadOrder = createAction('[Order] Load', props<{ id: number }>());
export const loadOrderSuccess = createAction('[Order] Load Success', props<{ order: Order }>());
export const loadOrderFailure = createAction('[Order] Load Failure', props<{ error: any }>());

export const setOrder = createAction('[Order] Set', props<{ order: Order }>());

export const loadOrderProducts = createAction('[Order] Load Products', props<{ id: number }>());
export const loadOrderProductsSuccess = createAction('[Order] Load Products Success', props<{ items: Product[] }>());
export const loadOrderProductsFailure = createAction('[Order] Load Products Failure', props<{ error: any }>());

export const createOrder = createAction('[Order] Create', props<{ payload: any }>());
export const createOrderSuccess = createAction('[Order] Create Success', props<{ order: Order }>());
export const createOrderFailure = createAction('[Order] Create Failure', props<{ error: any }>());

export const updateOrder = createAction('[Order] Update', props<{ id: number, payload: any }>());
export const updateOrderSuccess = createAction('[Order] Update Success', props<{ order: Order }>());
export const updateOrderFailure = createAction('[Order] Update Failure', props<{ error: any }>());

export const importProducts = createAction('[Order] Import Products', props<{ id: number, file: File }>());
export const importProductsSuccess = createAction('[Order] Import Products Success', props<{ items: Product[] }>());
export const importProductsFailure = createAction('[Order] Import Products Failure', props<{ error: any }>());
