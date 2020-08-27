import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { CustomerModel } from '../../../interfaces/CustomerModel';

@Injectable({
    providedIn: 'root'
})

export class CustomerService {

    constructor(private _http: HttpClient) {
    }

    baseUrl: string = 'http://localhost:8082/api/customers';

    public getAllCustomers(): Observable<any> {
        return this._http.get<CustomerModel[]>(this.baseUrl);
    }

    public getCustomerByAccountNumber(accountNumber: number) {
        return this._http.get<CustomerModel>(`${this.baseUrl}/${accountNumber}`);
    }

    public createCustomer(customermodel: CustomerModel) {
        return this._http.post<CustomerModel>(this.baseUrl, customermodel);
    }

    public updateCustomer(accountNumber: number, customerModel: CustomerModel) {
        return this._http.put<CustomerModel>(`${this.baseUrl}/${accountNumber}`, customerModel);
    }

    public getAllCustomersByBranchId(branchId: number) {
        return this._http.get(`${this.baseUrl}/branch/${branchId}`);
    }

    public getAllCustomersByStatus(statusId: number) {
        return this._http.get(`${this.baseUrl}/status/${statusId}`);
    }

    public getAllCustomersByAccountType(accountTypeId: number) {
        return this._http.get(`${this.baseUrl}/account-type/${accountTypeId}`);
    }

    public getCustomersCount() {
        return this._http.get<number>(`${this.baseUrl}/count`);
    }

    public getBankBalance() {
        return this._http.get<number>(`${this.baseUrl}/balance`);
    }


}