import { Order } from './order';
import { Meta } from '../common/meta';

export class OrdersResponse {
    data: Order[];
    meta: Meta;
}
