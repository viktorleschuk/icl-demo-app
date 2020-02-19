import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { map, switchMap } from 'rxjs/operators';

import { AuthDispatchers, AuthSelectors } from '../../store/services';
import { Observable, of } from 'rxjs';

@Injectable()
export class GuestGuard implements CanActivate {
    constructor(private authSelectors: AuthSelectors,
                private router: Router) {
    }

    canActivate(): Observable<boolean> {
        return this.authSelectors.loggedIn$.pipe(
            switchMap(authed => {
                    if (authed) {
                        this.router.navigateByUrl('/orders');
                    }
                    return of(!authed);
                }
            )
        );
    }
}
