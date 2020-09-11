import { LoanModel } from './../../../interfaces/LoanModel';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoanService {

  constructor(private http: HttpClient) { }

  baseUrl: string = "http://localhost:8082/api/loans";

  public getAllLoans() {
    return this.http.get<LoanModel[]>(this.baseUrl);
  }

  public getLoanByLoanId(loanId: number) {
    return this.http.get<LoanModel>(`${this.baseUrl}/${loanId}`);
  }

  public getLoanByBranchId(branchId: number) {
    return this.http.get<LoanModel[]>(`${this.baseUrl}/branch/${branchId}`);
  }

  public getAllLoansCount() {
    return this.http.get<any>(`${this.baseUrl}/count`)
  }


  public getAllLoansCountByBranchId(branchId: number) {
    return this.http.get<any>(`${this.baseUrl}/count/branch/${branchId}`)
  }

  public getLoansByAccountNumber(accountNumber: number) {
    return this.http.get<LoanModel[]>(`${this.baseUrl}/customer/${accountNumber}`);
  }

  public createLoan(loanModel: LoanModel) {
    return this.http.post<LoanModel>(`${this.baseUrl}`, loanModel);
  }

  public updateLoan(loanNumber: number, loanModel: LoanModel) {
    return this.http.put<LoanModel>(`${this.baseUrl}/${loanNumber}`, loanModel);
  }

  public updateLoanStatus(loanId: number, loanStatusId: number, loanModel: LoanModel) {
    return this.http.put(`${this.baseUrl}/${loanId}/status/${loanStatusId}`, loanModel);
  }

}
