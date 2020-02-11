import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LayoutComponent} from './components/layout/layout.component';
import {NavItemComponent} from './components/nav-item/nav-item.component';
import {SidenavComponent} from './components/sidenav/sidenav.component';
import {ToolbarComponent} from './components/toolbar/toolbar.component';
import {MaterialModule} from '../material';
import {RouterModule} from '@angular/router';

export const COMPONENTS = [
  LayoutComponent,
  NavItemComponent,
  SidenavComponent,
  ToolbarComponent,
];

@NgModule({
  imports: [CommonModule, MaterialModule, RouterModule],
  declarations: COMPONENTS,
  exports: COMPONENTS,
})
export class CoreModule {}
