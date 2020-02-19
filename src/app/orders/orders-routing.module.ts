import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrdersListComponent } from './list/list.component';
import { OrderExistsGuard } from './shared/order-exists.guard';
import { OrdersShowComponent } from './show/show.component';
import { LayoutComponent } from '../core/layout/layout.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: OrdersListComponent
      },
      {
        path: ':id',
        component: OrdersShowComponent,
        canActivate: [OrderExistsGuard]
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrdersRoutingModule {}
