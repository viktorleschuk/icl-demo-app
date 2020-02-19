import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

import { catchError, filter, map, switchMap, take, tap } from 'rxjs/operators';

import { AuthDispatchers, AuthSelectors } from '../../store/services';
import { Observable, of } from 'rxjs';
import { User } from '../../core/models';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private authSelectors: AuthSelectors,
                private authDispatchers: AuthDispatchers) {
    }

    canActivate(): Observable<boolean> {
        this.authDispatchers.loadUser();
        return this.waitForCollectionToLoad().pipe(
            switchMap(() => of(true))
        );
    }

    waitForCollectionToLoad(): Observable<User> {
        return this.authSelectors.user$.pipe(
            filter(user => !!user),
            take(1)
        );
    }
}
