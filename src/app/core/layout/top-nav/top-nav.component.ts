import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AuthDispatchers, AuthSelectors } from '../../../store/services';
import { Observable } from 'rxjs';
import { User } from '../../models';

@Component({
    selector: 'app-top-nav',
    templateUrl: './top-nav.component.html',
    styleUrls: ['./top-nav.component.scss']
})
export class TopNavComponent {
    @Output() sideNavToggled = new EventEmitter<void>();

    user$: Observable<User>;

    constructor(private authSelectors: AuthSelectors,
                private authDispatchers: AuthDispatchers) {
        this.user$ = authSelectors.user$;
    }

    toggleSidebar() {
        this.sideNavToggled.emit();
    }

    logout() {
        this.authDispatchers.logout();
    }
}
