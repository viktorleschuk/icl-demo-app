import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { services } from './';
import { effects } from './effects';
import { reducers } from './reducers';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
        StoreModule.forFeature('entityCache', reducers),
        EffectsModule.forFeature(effects),
        RouterModule
    ],
    providers: [...services],
    exports: [StoreModule, EffectsModule]
})
export class AppStoreModule {
}
