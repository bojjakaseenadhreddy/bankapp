import { HttpClient } from '@angular/common/http';
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
    public updateComplaintById(complaintId, complaintModel) {
        return this.http.put(`${this.baseUrl}/${complaintId}`, complaintModel);
    }

    public updateComplaintStatusById(statusId: number, complaintId: number, complaintModel?: ComplaintModel) {
        return this.http.put(`${this.baseUrl}/${complaintId}/status/${statusId}`, null);
    }
    public getComplaintsCount() {
        return this.http.get(`${this.baseUrl}/count`);
    }
    public getComplaintsCountByStatusId(statusId: number) {
        return this.http.get(`${this.baseUrl}/count/${statusId}`);
    }

}