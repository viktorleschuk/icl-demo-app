import { Component, OnInit } from '@angular/core';
import { AuthDispatchers } from '../../../store/services';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {
  showMenu = false;
  constructor(private authDispatchers: AuthDispatchers) {}

  ngOnInit() {}

  logout() {
    this.authDispatchers.logout();
  }
}
