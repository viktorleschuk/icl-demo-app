import { Action, createReducer, on } from '@ngrx/store';
import * as OrdersActions from '../actions';
import { Order, User } from '../../core';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

export interface OrdersState extends EntityState<Order> {
    error: string;
    loading: boolean;
    total: number;
}

export const ordersAdapter: EntityAdapter<Order> = createEntityAdapter<Order>({
    selectId: (order: Order) => order.id
});

export const initialState: OrdersState = ordersAdapter.getInitialState({
    error: null,
    loading: false,
    total: 0
});

export const ordersReducer = createReducer(
    initialState,
    on(OrdersActions.load, state => {
        return ordersAdapter.removeAll({
            ...state,
            loading: true,
            error: null
        });
    }),
    on(OrdersActions.loadSuccess, (state, {payload}) => {
        return ordersAdapter.addMany(payload.data, {
            ...state,
            error: null,
            loading: false,
            total: payload.meta.total
        });
    }),
    on(OrdersActions.loadFailure, (state, {error}) => {
        return ordersAdapter.removeAll({
            ...state, error,
            loading: false,
            total: 0
        });
    }),
    on(OrdersActions.storeClear, (state) => initialState),
);

export function reducer(state: OrdersState | undefined, action: Action) {
    return ordersReducer(state, action);
}
