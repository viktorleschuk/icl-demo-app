import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-nav-item',
  templateUrl: './nav-item.component.html',
  styles: [
    `
      .secondary {
        color: rgba(0, 0, 0, 0.54);
      }
    `,
  ],
})
export class NavItemComponent {
  @Input() icon = '';
  @Input() hint = '';
  @Input() routerLink: string | any[] = '/';
  @Output() navigate = new EventEmitter();
}
