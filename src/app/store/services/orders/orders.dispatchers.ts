import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as OrdersActions from '../../actions';
import { Credentials, IndexParams } from '../../../core/models';
import { EntityState } from '../../reducers';

@Injectable()
export class OrdersDispatchers {
    constructor(private store: Store<EntityState>) {
    }

    loadOrders(payload: IndexParams) {
        this.store.dispatch(OrdersActions.load({payload}));
    }

    clearStore() {
        this.store.dispatch(OrdersActions.storeClear());
    }
}
