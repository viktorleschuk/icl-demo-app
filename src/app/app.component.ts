import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AuthService } from './auth/shared/auth.service';
import { AuthDispatchers, CoreSelectors } from './store/services';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {

    loading$: Observable<boolean>;
    constructor(private authService: AuthService,
                private authDispatchers: AuthDispatchers,
                private coreSelectors: CoreSelectors) {
        this.loading$ = coreSelectors.loading$;
    }

    ngOnInit(): void {
        // TODO: try to move to effects
        if (this.authService.check()) {
            this.authDispatchers.storeToken(this.authService.token());
        }
    }
}
