import { Injectable } from '@angular/core';
import { Store, createSelector, createFeatureSelector } from '@ngrx/store';
import { EntityState } from '../../reducers';
import { OrdersState } from '../../reducers/orders.reducer';
import { ordersAdapter } from '../../reducers/orders.reducer';

export const {
    selectIds: _selectOrdersDataIds,
    selectEntities: _selectOrdersEntities,
    selectAll: _selectAllOrders,
    selectTotal: _selectOrdersTotal
} = ordersAdapter.getSelectors();

const getEntityState = createFeatureSelector<EntityState>('entityCache');

const getOrdersState = createSelector(
    getEntityState,
    (state: EntityState) => state.orders
);

export const getOrdersIds = createSelector(
    getOrdersState,
    _selectOrdersDataIds
);

export const getOrdersEntities = createSelector(
    getOrdersState,
    _selectOrdersEntities
);

export const getAllOrders = createSelector(
    getOrdersState,
    _selectAllOrders
);

export const getOrdersError = createSelector(
    getOrdersState,
    (state: OrdersState): string => state.error
);

export const getOrdersLoading = createSelector(
    getOrdersState,
    (state: OrdersState): boolean => state.loading
);


export const getOrdersTotal = createSelector(
    getOrdersState,
    (state: OrdersState): number => state.total
);

@Injectable()
export class OrdersSelectors {
    constructor(private store: Store<EntityState>) {
    }

    // selectors$
    orders$ = this.store.select(getAllOrders);
    total$ = this.store.select(getOrdersTotal);
    error$ = this.store.select(getOrdersError);
    loading$ = this.store.select(getOrdersLoading);
}
