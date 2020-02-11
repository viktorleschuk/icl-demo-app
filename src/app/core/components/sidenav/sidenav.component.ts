import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: 'sidenav.component.html',
  styles: [
    `
      mat-sidenav {
        width: 300px;
      }
    `,
  ],
})
export class SidenavComponent {
  @Input() open = false;
  @Output() closeMenu = new EventEmitter();
}
