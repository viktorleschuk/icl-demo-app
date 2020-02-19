import { ActionReducerMap } from '@ngrx/store';
import * as fromAuth from './auth.reducer';
import * as fromOrders from './orders.reducer';
import * as fromOrder from './order.reducer';

export interface EntityState {
    auth: fromAuth.AuthState;
    orders: fromOrders.OrdersState;
    order: fromOrder.OrderState;
}

export const reducers: ActionReducerMap<EntityState> = {
    auth: fromAuth.reducer,
    orders: fromOrders.reducer,
    order: fromOrder.reducer,
};
