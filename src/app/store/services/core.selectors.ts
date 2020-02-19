import { AuthSelectors } from './auth/auth.selectors';
import { Injectable } from '@angular/core';
import { OrdersSelectors } from './orders/orders.selectors';
import { OrderSelectors } from './order/order.selectors';
import { combineLatest, merge } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Injectable()
export class CoreSelectors {
    constructor(private authSelectors: AuthSelectors,
                private ordersSelectors: OrdersSelectors,
                private orderSelectors: OrderSelectors) {
    }

    // selectors$
    loading$ = combineLatest(this.authSelectors.loading$, this.ordersSelectors.loading$, this.orderSelectors.loading$,
        (auth, orders, order) => {
            return auth || orders || order;
        });
}
