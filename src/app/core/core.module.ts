import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material';
import { RouterModule } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { TopNavComponent } from './layout/top-nav/top-nav.component';
import { SideNavComponent } from './layout/side-nav/side-nav.component';
import { ApiValidationDirective } from './directives/api-validation.directive';
import { NotFoundComponent } from './components/not-found/not-found.component';

export const COMPONENTS = [
    LayoutComponent,
    TopNavComponent,
    SideNavComponent,
    ApiValidationDirective,
    NotFoundComponent
];

@NgModule({
    imports: [CommonModule, MaterialModule, RouterModule],
    declarations: COMPONENTS,
    exports: COMPONENTS,
})
export class CoreModule {
}
