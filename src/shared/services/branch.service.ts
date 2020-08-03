import { BranchModel } from '../../models/BranchModel';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";

@Injectable({
    providedIn:'root'
})

export class BranchService{

    baseUrl:string = 'http://localhost:8082/api/branches';

    constructor(private http:HttpClient){}

    public getAllBranches(){
        return this.http.get<BranchModel[]>(this.baseUrl);
    }

    public getBranchById(branchId:number){
        return this.http.get<BranchModel>(`${this.baseUrl}/${branchId}`);
    }

    public createBranch(branchModel:BranchModel){
        return this.http.post<BranchModel>(this.baseUrl,branchModel);
    }

    public updateBranch(branchId:number,branchModel:BranchModel){
        return this.http.put(`${this.baseUrl}/${branchId}`,branchModel);
    }
    

}