import { Action, createReducer, on } from '@ngrx/store';
import * as OrderActions from '../actions';
import { Order } from '../../core';

export interface OrderState {
    order: Order | null;
    loading: boolean;
    error: any | null;
}

export const initialState: OrderState = {
    order: null,
    loading: false,
    error: null
};

export const orderReducer = createReducer(
    initialState,
    on(OrderActions.loadOrder, state => ({
        order: null,
        error: null,
        loading: true,
    })),
    on(OrderActions.loadOrderSuccess, (state, {order}) => ({
        ...state, order,
        error: null,
        loading: false,
    })),
    on(OrderActions.loadOrderFailure, (state, {error}) => ({
        ...state, error,
        order: null,
        loading: false,
    })),
    on(OrderActions.updateOrder, state => ({
        ...state,
        error: null,
        loading: true,
    })),
    on(OrderActions.updateOrderSuccess, (state, {order}) => ({
        ...state,
        order: Object.assign(state.order, order),
        error: null,
        loading: false,
    })),
    on(OrderActions.updateOrderFailure, (state, {error}) => ({
        ...state, error,
        loading: false,
    })),
    on(OrderActions.createOrder, state => ({
        ...state,
        order: null,
        error: null,
        loading: true,
    })),
    on(OrderActions.createOrderSuccess, (state, {order}) => ({
        ...state, order,
        error: null,
        loading: false,
    })),
    on(OrderActions.createOrderFailure, (state, {error}) => ({
        ...state, error,
        order: null,
        loading: false,
    })),
    on(OrderActions.loadOrderProducts, state => ({
        ...state,
        error: null,
        loading: true,
    })),
    on(OrderActions.loadOrderProductsSuccess, (state, {items}) => ({
        order: Object.assign(state.order, {items}),
        error: null,
        loading: false,
    })),
    on(OrderActions.loadOrderProductsFailure, (state, {error}) => ({
        ...state, error,
        loading: false,
    })),
    on(OrderActions.setOrder, (state, {order}) => ({
        ...state, order
    })),
    on(OrderActions.importProducts, (state) => ({
        ...state,
        error: null,
        loading: true
    })),
    on(OrderActions.importProductsSuccess, (state, {items}) => ({
        ...state,
        order: Object.assign(state.order, {items}),
        error: null,
        loading: false
    })),
    on(OrderActions.importProductsFailure, (state, {error}) => ({
        ...state, error,
        loading: false,
    })),
);

export function reducer(state: OrderState | undefined, action: Action) {
    return orderReducer(state, action);
}
