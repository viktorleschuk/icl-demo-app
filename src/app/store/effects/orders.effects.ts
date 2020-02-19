import { Injectable } from '@angular/core';
import { Actions, createEffect, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import { OrdersService } from '../../orders/shared/orders.service';
import * as OrdersActions from '../actions';
import { IndexParams, OrdersResponse } from '../../core/models';

@Injectable()
export class OrdersEffects {
    constructor(private service: OrdersService, private actions$: Actions) {
    }

    loadOrders$ = createEffect(
        () => this.actions$.pipe(
            ofType(OrdersActions.load),
            map(action => action.payload),
            switchMap((params: IndexParams) =>
                this.service.getOrders(params).pipe(
                    map((payload: OrdersResponse) => OrdersActions.loadSuccess({payload})),
                    catchError((error) => of(OrdersActions.loadFailure({error})))
                )
            )
        )
    );
}
