import { LoanTypeModel } from './../../../interfaces/LoanTypeModel';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoanTypeService {

  constructor(private http: HttpClient) { }

  baseUrl: string = "http://localhost:8082/api/loan-types";

  public getAllLoanTypes() {
    return this.http.get<LoanTypeModel[]>(this.baseUrl);
  }

  public getLoanTypeById(loanTypeId: number) {
    return this.http.get(`${this.baseUrl}/${loanTypeId}`);
  }
}
