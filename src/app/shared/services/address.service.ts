
import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http';
import { AddressModel } from '../../../interfaces/AddressModel';

@Injectable({
    providedIn:'root'
})
export class AddressService{

    baseUrl:string = "http://localhost:8082/api/addresses"

    constructor( private http:HttpClient){
    }

    public getAllAddresses(){
        return this.http.get<AddressModel[]>(this.baseUrl);
    }

    public getAddressById(addressId:number){
        return this.http.get<AddressModel>(`${this.baseUrl}/${addressId}`);
    }

    public createAddress(addressModel:AddressModel){
       return this.http.post<AddressModel>(this.baseUrl,addressModel);
    }

    public updateAddress(addressModel:AddressModel){
        return this.http.post<AddressModel>(this.baseUrl,addressModel);
    }

    public deleteAddress(addressId:number){
        return this.http.delete(`${this.baseUrl}/${addressId}`);
    }
}
