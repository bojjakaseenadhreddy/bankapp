import { LoginModel } from '../../../interfaces/LoginModel';

import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { UserModel } from '../../../interfaces/UserModel';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    baseUrl: string = 'http://localhost:8082/api/users'
    constructor(private _http: HttpClient) {
    }

    public getAllUsers() {
        return this._http.get<UserModel[]>(`${this.baseUrl}`);
    }

    public createUser(userModel: UserModel) {
        return this._http.post<UserModel>(`${this.baseUrl}`, userModel)
    }

    public updateUser(userId: number, userModel: UserModel) {
        return this._http.put<UserModel>(`${this.baseUrl}/${userId}`, userModel)
    }

    public getUserById(userId:number) {
        return this._http.get<UserModel>(`${this.baseUrl}/${userId}`);
    }

    public getAllUsersByRoleId(roleId: number) {
        return this._http.get<UserModel[]>(`${this.baseUrl}/role/${roleId}`);
    }

    public getAllUsersByBranchId(branchId: number) {
        return this._http.get<UserModel[]>(`${this.baseUrl}/branch/${branchId}`);
    }

    public getAllCustomersByRowStatusId(rowStatusId: number) {
        return this._http.get<UserModel[]>(`${this.baseUrl}/row-status/${rowStatusId}`);
    }

    public changeUserRowStatusId(userId: number, rowStatusId: number, userModel: UserModel) {
        return this._http.put(`${this.baseUrl}/${userId}/${rowStatusId}`, userModel);
    }

    public login(loginModel: LoginModel) {
        return this._http.post<any>(`${this.baseUrl}/login`, loginModel);
    }
}
