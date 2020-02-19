import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from '../material';
import { OrdersRoutingModule } from './orders-routing.module';
import { OrdersListComponent } from './list/list.component';
import { OrdersService } from './shared/orders.service';
import { OrderCreateModalComponent } from './create/create-modal.component';
import { CoreModule } from '../core/core.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrderExistsGuard } from './shared/order-exists.guard';
import { OrdersShowComponent } from './show/show.component';

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        OrdersRoutingModule,
        CoreModule,
        FormsModule,
        ReactiveFormsModule
    ],
    providers: [OrdersService, OrderExistsGuard],
    declarations: [OrdersListComponent, OrderCreateModalComponent, OrdersShowComponent],
    entryComponents: [OrderCreateModalComponent]
})
export class OrdersModule {
}
