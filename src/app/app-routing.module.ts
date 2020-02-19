import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth/shared/auth.guard';
import { LayoutComponent } from './core/layout/layout.component';
import { LoginComponent } from './auth/login/login.component';
import { NotFoundComponent } from './core/components/not-found/not-found.component';
import { GuestGuard } from './auth/shared/guest.guard';


const routes: Routes = [
    {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
    },
    {path: 'login', component: LoginComponent, canActivate: [GuestGuard]},
    {
        path: 'orders',
        loadChildren: () =>
            import('./orders/orders.module').then(m => m.OrdersModule),
        canActivate: [AuthGuard],
    },
    {
        path: '**',
        component: NotFoundComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
