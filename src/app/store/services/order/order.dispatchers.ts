import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as OrderActions from '../../actions';
import { Credentials, IndexParams, Order } from '../../../core/models';
import { EntityState } from '../../reducers';

@Injectable()
export class OrderDispatchers {
    constructor(private store: Store<EntityState>) {
    }

    loadOrder(id: number) {
        this.store.dispatch(OrderActions.loadOrder({id}));
    }

    createOrder(payload: any) {
        this.store.dispatch(OrderActions.createOrder({payload}));
    }

    updateOrder(id: number, payload: any) {
        this.store.dispatch(OrderActions.updateOrder({id, payload}));
    }

    importProducts(id: number, file: File) {
        this.store.dispatch(OrderActions.importProducts({id, file}));
    }

    loadProducts(id: number) {
        this.store.dispatch(OrderActions.loadOrderProducts({id}));
    }

    setOrder(order: Order) {
        this.store.dispatch(OrderActions.setOrder({order}));
    }
}
