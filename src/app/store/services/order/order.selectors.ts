import { Injectable } from '@angular/core';
import { Store, createSelector, createFeatureSelector } from '@ngrx/store';

import { EntityState } from '../../reducers';
import { OrderState } from '../../reducers/order.reducer';

const getEntityState = createFeatureSelector<EntityState>('entityCache');

const getOrderState = createSelector(
    getEntityState,
    (state: EntityState) => state.order
);

export const getOrder = createSelector(
    getOrderState,
    (state: OrderState) => state.order
);

export const getOrderProducts = createSelector(
    getOrderState,
    (state: OrderState) => state.order.items || []
);

export const getOrderLoading = createSelector(
    getOrderState,
    (state: OrderState) => state.loading
);

export const getOrderError = createSelector(
    getOrderState,
    (state: OrderState) => state.error
);

@Injectable()
export class OrderSelectors {
    constructor(private store: Store<EntityState>) {
    }

    // selectors$
    order$ = this.store.select(getOrder);
    orderProducts$ = this.store.select(getOrderProducts);
    loading$ = this.store.select(getOrderLoading);
    error$ = this.store.select(getOrderError);
}
