import { Injectable } from '@angular/core';
import { Actions, createEffect, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, map, catchError, tap } from 'rxjs/operators';
import { OrdersService } from '../../orders/shared/orders.service';
import * as OrderActions from '../actions';
import { Order, Product } from '../../core/models';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class OrderEffects {
    constructor(private service: OrdersService, private actions$: Actions,
                private _snackBar: MatSnackBar) {
    }

    loadOrder$ = createEffect(() => this.actions$.pipe(
        ofType(OrderActions.loadOrder),
        map(action => action.id),
        switchMap((id: number) =>
            this.service.getOrder(id).pipe(
                map((order: Order) => OrderActions.loadOrderSuccess({order})),
                catchError((error) => of(OrderActions.loadOrderFailure({error})))
            )
        ))
    );

    loadOrderProducts$ = createEffect(() => this.actions$.pipe(
        ofType(OrderActions.loadOrderProducts),
        map(action => action.id),
        switchMap((id: number) =>
            this.service.getOrderProducts(id).pipe(
                map((items: Product[]) => OrderActions.loadOrderProductsSuccess({items})),
                catchError((error) => of(OrderActions.loadOrderProductsFailure({error})))
            )
        ))
    );

    createOrder$ = createEffect(() => this.actions$.pipe(
        ofType(OrderActions.createOrder),
        map(action => action.payload),
        switchMap((payload: any) =>
            this.service.createOrder(payload).pipe(
                map((order: Order) => OrderActions.createOrderSuccess({order})),
                catchError((error) => of(OrderActions.createOrderFailure({error})))
            )
        ))
    );

    updateOrder$ = createEffect(() => this.actions$.pipe(
        ofType(OrderActions.updateOrder),
        switchMap((action: any) =>
            this.service.updateOrder(action.id, action.payload).pipe(
                map((order: Order) => OrderActions.updateOrderSuccess({order})),
                catchError((error) => of(OrderActions.updateOrderFailure({error})))
            )
        ))
    );

    importProducts$ = createEffect(() => this.actions$.pipe(
        ofType(OrderActions.importProducts),
        switchMap((action: any) =>
            this.service.importProducts(action.id, action.file).pipe(
                map((items: Product[]) => OrderActions.importProductsSuccess({items})),
                catchError((error) => of(OrderActions.importProductsFailure({error})))
            )
        ))
    );

    errorShow$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(
                    OrderActions.createOrderFailure,
                    OrderActions.loadOrderFailure,
                    OrderActions.updateOrderFailure,
                    OrderActions.importProductsFailure
                ),
                tap(action => {
                    const error = action.error;
                    return this.showError(error.message || 'Something went wrong');
                })
            ),
        {dispatch: false}
    );

    private showError(message) {
        this._snackBar.open(message, 'Error', {
            duration: 5000,
            horizontalPosition: 'right',
            verticalPosition: 'top'
        });
    }
}
