import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Order, Product } from '../../core/models';
import { OrderDispatchers, OrderSelectors } from '../../store/services';
import { Observable, race } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { switchMap, take, tap } from 'rxjs/operators';
import { Actions, ofType } from '@ngrx/effects';
import * as OrderActions from '../../store/actions';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
    selector: 'app-orders-show',
    templateUrl: './show.component.html',
    styleUrls: ['./show.component.scss'],
})
export class OrdersShowComponent implements OnInit {

    displayedColumns: string[] = ['id', 'name', 'quantity', 'price'];
    dataSource: MatTableDataSource<Product>;

    order$: Observable<Order>;
    loading$: Observable<boolean>;

    editMode: boolean = false;
    orderForm: FormGroup;

    order: Order;

    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
    @ViewChild(MatSort, {static: true}) sort: MatSort;

    constructor(private orderSelectors: OrderSelectors,
                private orderDispatchers: OrderDispatchers,
                private actions$: Actions,
                private formBuilder: FormBuilder) {
        this.order$ = orderSelectors.order$;
        this.loading$ = orderSelectors.loading$;
        this.dataSource = new MatTableDataSource([]);
        this.orderSelectors.orderProducts$
            .pipe(untilDestroyed(this))
            .subscribe(
            (products: Product[]) => {
                this.dataSource = new MatTableDataSource(products);
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
            }
        );
    }

    ngOnInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }

    edit() {
        if (!this.editMode) {
            this.orderSelectors.order$.pipe(take(1))
                .subscribe((order: Order) => {
                    this.order = order;
                    this.orderForm = this.formBuilder.group({
                        client_name: [order.client_name, [Validators.required]],
                        client_phone: [order.client_phone, [Validators.required]],
                        client_address: [order.client_address, [Validators.required]],
                    });
                });

            this.editMode = true;
        } else {
            this.editMode = false;
        }
    }

    importProducts(fileInput: any) {
        const file = <File> fileInput.target.files[0];
        if (file) {
            this.orderSelectors.order$.pipe(
                take(1),
                tap((order: Order) => {
                    this.orderDispatchers.importProducts(order.id, file);
                }),
                switchMap(_ => {
                    const responseOk = this.actions$.pipe(
                        ofType(OrderActions.importProductsSuccess)
                    );

                    const responseFailure = this.actions$.pipe(
                        ofType(OrderActions.importProductsFailure)
                    );

                    return race(responseOk, responseFailure);
                }),
                take(1)
            ).subscribe(state => {
                if (state.type === OrderActions.importProductsSuccess.type) {

                } else {
                }
            });
        }
    }

    update() {
        const data = this.orderForm.value;

        this.orderDispatchers.updateOrder(this.order.id, data);

        const responseOk = this.actions$.pipe(
            ofType(OrderActions.updateOrderSuccess)
        );

        const responseFailure = this.actions$.pipe(
            ofType(OrderActions.updateOrderFailure)
        );

        race(responseOk, responseFailure).pipe(
            take(1)
        ).subscribe((state) => {
            if (state.type === OrderActions.updateOrderSuccess.type) {
                this.editMode = false;
            } else {
                const error = state.error;
                if (error.errors) {
                    this.handleError(error.errors);
                }
                // this.router.navigateByUrl(`/orders/${order.id}`);
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
