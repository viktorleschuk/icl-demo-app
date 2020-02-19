import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OrderDispatchers } from '../../store/services/order/order.dispatchers';
import { OrderSelectors } from '../../store/services/order/order.selectors';
import { Actions, ofType } from '@ngrx/effects';
import * as OrderActions from '../../store/actions';
import { Observable, race } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
    selector: 'app-orders-create-modal-form',
    templateUrl: './create-modal.component.html',
    styleUrls: ['./create-modal.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class OrderCreateModalComponent {
    orderForm: FormGroup;
    action: string;
    public loading: boolean;

    constructor(public dialogRef: MatDialogRef<OrderCreateModalComponent>,
                @Inject(MAT_DIALOG_DATA) private data: any,
                private formBuilder: FormBuilder,
                private router: Router,
                public dialog: MatDialog,
                public snackBar: MatSnackBar,
                private orderDispatcher: OrderDispatchers,
                private orderSelectors: OrderSelectors,
                private actions$: Actions
    ) {
        this.orderForm = this.createOrderForm();
        this.orderSelectors.loading$.subscribe(loading => {
            this.loading = loading;
            this.orderForm[loading ? 'disable' : 'enable']();
        });
    }

    createOrderForm() {

        return this.formBuilder.group({
            client_name: ['', [Validators.required]],
            client_phone: ['', [Validators.required]],
            client_address: ['', [Validators.required]],
        });
    }

    createOrder() {

        const data = this.orderForm.value;

        this.orderDispatcher.createOrder(data);

        const responseOk = this.actions$.pipe(
            ofType(OrderActions.createOrderSuccess)
        );

        const responseFailure = this.actions$.pipe(
            ofType(OrderActions.createOrderFailure)
        );

        race(responseOk, responseFailure).pipe(
            take(1)
        ).subscribe((state) => {
            if (state.type === OrderActions.createOrderFailure.type) {
                const error = state.error;
                if (error.errors) { this.handleError(error.errors); }
            } else {
                const order = state.order;
                this.router.navigateByUrl(`/orders/${order.id}`);
                this.dialogRef.close();
            }
        });
    }

    handleError(errors) {
        for (const field in errors) {
            if (this.orderForm.get(field)) {
                this.orderForm.get(field).setErrors({custom: errors[field]});
            }
        }
    }
}
