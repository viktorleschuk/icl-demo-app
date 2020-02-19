import { AfterViewInit, ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { merge, Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { IndexParams, Order } from '../../core/models';
import { OrderDispatchers, OrdersDispatchers, OrdersSelectors } from '../../store/services';
import { MatDialog } from '@angular/material/dialog';
import { OrderCreateModalComponent } from '../create/create-modal.component';
import { Router } from '@angular/router';

@Component({
    selector: 'app-orders-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrdersListComponent implements OnInit, AfterViewInit, OnDestroy {

    @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;

    public displayedColumns: string[] = ['id', 'client_name', 'client_phone', 'client_address', 'items_count', 'total_sum'];
    public dataSource: MatTableDataSource<Order>;
    public ordersTotal: number;
    public ordersTotal$: Observable<number>;
    public noData: Order[] = [<Order> {}];
    public loading$: Observable<boolean>;
    // public loading: boolean;
    public error$: Observable<string>;
    public filterSubject = new Subject<string>();

    private filter = '';

    constructor(private ordersSelectors: OrdersSelectors,
                private ordersDispatchers: OrdersDispatchers,
                private orderDispatchers: OrderDispatchers,
                private router: Router,
                public dialog: MatDialog) {

    }

    public ngOnInit(): void {
        this.ordersSelectors.orders$.subscribe(orders => this.initializeData(orders));
        this.ordersSelectors.total$.subscribe(total => this.ordersTotal = total);
        this.loading$ = this.ordersSelectors.loading$;
        this.error$ = this.ordersSelectors.error$;
    }

    public ngAfterViewInit(): void {
        this.loadOrders();
        const filter$ = this.filterSubject.pipe(
            debounceTime(150),
            distinctUntilChanged(),
            tap((value: string) => {
                this.paginator.pageIndex = 0;
                this.filter = value;
            })
        );

        merge(filter$, this.paginator.page).subscribe(() => this.loadOrders());
    }

    private loadOrders(): void {
        this.ordersDispatchers.loadOrders(
            <IndexParams> {
                filter: this.filter.toLocaleLowerCase(),
                page: this.paginator.pageIndex + 1,
                page_size: this.paginator.pageSize
            }
        );
    }

    private initializeData(orders: Order[]): void {
        this.dataSource = new MatTableDataSource(orders);
    }

    public retry(): void {
        this.loadOrders();
    }

    createNewOrder() {
        const dialogRef = this.dialog.open(OrderCreateModalComponent, {
            panelClass: 'order-form-dialog'
        });
    }

    showOrder(order: Order) {
        this.orderDispatchers.setOrder(order);
        this.router.navigateByUrl(`/orders/${order.id}`);
    }

    ngOnDestroy(): void {
        this.ordersDispatchers.clearStore();
    }
}
