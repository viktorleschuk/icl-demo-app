export * from './actions';
export * from './effects';
export * from './reducers';
export * from './services';

import {
    AuthDispatchers,
    AuthSelectors, CoreSelectors, OrderDispatchers,
    OrdersDispatchers, OrderSelectors,
    OrdersSelectors,
} from './services';

export const services = [
    AuthDispatchers,
    AuthSelectors,
    OrdersDispatchers,
    OrdersSelectors,
    OrderDispatchers,
    OrderSelectors,
    CoreSelectors
];
