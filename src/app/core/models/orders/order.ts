import { Product } from './product';

export interface Order {
    id: number;
    user_id: number;
    client_name: string;
    client_phone: string;
    client_address: string;
    items_count: number;
    total_sum: number;
    created_at: string;
    updated_at: string;
    items?: Product[];
}
