import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, delay, map } from 'rxjs/operators';
import { IndexParams, Order, OrdersResponse, Product } from '../../core/models';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class OrdersService {

    constructor(private http: HttpClient) {
    }

    public getOrders(params: IndexParams): Observable<OrdersResponse> {
        return this.http.get(`${environment.apiUrl}/orders`, {params: params as any}).pipe(
            map((response: any) => response),
            catchError(this.handleError())
        );
    }

    public getOrderProducts(id: number): Observable<Product[]> {
        return this.http.get(`${environment.apiUrl}/orders/${id}/items`).pipe(
            map((response: any) => response.data),
            catchError(this.handleError())
        );
    }

    public getOrder(id: number): Observable<Order> {
        return this.http.get(`${environment.apiUrl}/orders/${id}`).pipe(
            map((response: any) => response),
            catchError(this.handleError())
        );
    }

    public createOrder(payload: any): Observable<Order> {
        return this.http.post(`${environment.apiUrl}/orders`, payload).pipe(
            map((response: any) => response),
            catchError(this.handleError())
        );
    }

    public updateOrder(id: number, payload: any): Observable<Order> {
        return this.http.put(`${environment.apiUrl}/orders/${id}`, payload).pipe(
            map((response: any) => response),
            catchError(this.handleError())
        );
    }

    public importProducts(id: number, file: File): Observable<Product[]> {
        const formData = new FormData();
        formData.append('file', file);
        return this.http.post(`${environment.apiUrl}/orders/${id}/items/import`, formData).pipe(
            map((response: any) => response),
            catchError(this.handleError())
        );
    }

    private handleError<T>() {
        return (res: HttpErrorResponse) => {
            return throwError(res.error);
        };
    }
}
