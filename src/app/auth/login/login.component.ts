import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Credentials } from '../../core/models';
import { AuthDispatchers, AuthSelectors } from '../../store/services';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-login-form',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class LoginComponent {

    loading$: Observable<boolean>;
    error$: Observable<string>;

    form: FormGroup = new FormGroup({
        email: new FormControl(''),
        password: new FormControl(''),
    });

    constructor(private authSelectors: AuthSelectors,
                private authDispatchers: AuthDispatchers) {
        this.loading$ = this.authSelectors.loading$;
        this.error$ = this.authSelectors.error$;
    }

    submit() {
        const credentials: Credentials = this.form.value;
        this.authDispatchers.login(credentials);
    }
}
