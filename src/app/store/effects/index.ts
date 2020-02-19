import { AuthEffects } from './auth.effects';
import { OrdersEffects } from './orders.effects';
import { OrderEffects } from './order.effects';

export const effects: any[] = [AuthEffects, OrdersEffects, OrderEffects];

export * from './auth.effects';
export * from './orders.effects';
export * from './order.effects';
