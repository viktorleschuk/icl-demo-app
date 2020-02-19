import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { interval, Observable, of } from 'rxjs';
import { catchError, filter, map, switchMap, take, tap } from 'rxjs/operators';
import { OrderDispatchers, OrderSelectors } from '../../store/services';

@Injectable()
export class OrderExistsGuard implements CanActivate {
    constructor(
        private orderDispatchers: OrderDispatchers,
        private orderSelectors: OrderSelectors
    ) {
    }

    canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
        const id = route.params.id;
        return this.orderSelectors.order$.pipe(
            take(1),
            switchMap(order => {
                if (!order) {
                    this.orderDispatchers.loadOrder(id);
                    return this.orderSelectors.order$.pipe(
                        filter(o => !!o),
                        take(1),
                        switchMap(o => of(true))
                    );
                } else {
                    this.orderDispatchers.loadProducts(id);
                    return of(true);
                }
            }),
        );
    }
}
