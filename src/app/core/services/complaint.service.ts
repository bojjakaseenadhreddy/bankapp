import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ComplaintModel } from "../../../interfaces/ComplaintModel";

@Injectable({
    providedIn: "root"
})
export class ComplaintService {

    constructor(private http: HttpClient) { }


    baseUrl: string = "http://localhost:8082/api/complaints";

    public getAllComplaints() {
        return this.http.get<ComplaintModel[]>(this.baseUrl);
    }

    public getComplaintById(complaintId: number) {
        return this.http.get<ComplaintModel>(`${this.baseUrl}/${complaintId}`);
    }
    public createComplaint(complaint: ComplaintModel) {
        return this.http.post<ComplaintModel>(this.baseUrl, complaint);
    }
    public updateComplaintById(complaintId: number, complaintModel: ComplaintModel):Observable<HttpResponse<ComplaintModel>>{
        return this.http.put<ComplaintModel>(`${this.baseUrl}/${complaintId}`, complaintModel,{ observe: 'response' });
    }

    public updateComplaintStatusById(statusId: number, complaintId: number, complaintModel?: ComplaintModel) {
        return this.http.put(`${this.baseUrl}/${complaintId}/status/${statusId}`, complaintModel);
    }
    public getComplaintsCount() {
        return this.http.get(`${this.baseUrl}/count`);
    }
    public getComplaintsCountByStatusId(statusId: number) {
        return this.http.get(`${this.baseUrl}/count/${statusId}`);
    }


    public getComplaintsCountByStatusIdAndBranchId(statusId: number, branchId: number) {
        return this.http.get(`${this.baseUrl}/count/statuses/${statusId}/branches/${branchId}`);
    }


    public getComplaintsByBranchId(branchId: number) {
        return this.http.get(`${this.baseUrl}/branch/${branchId}`);
    }

    public getComplaintsCountByAccountNumber(accountNumber:number){

      return this.http.get<number>(`${this.baseUrl}/count/customer/${accountNumber}`);
    }

    public getComplaintsByAccountNumber(accountNumber:number){
      return this.http.get<ComplaintModel[]>(`${this.baseUrl}/customers/${accountNumber}`);
    }

}
