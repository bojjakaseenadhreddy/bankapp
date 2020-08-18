import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { DepositModel } from '../../../interfaces/DepositModel';
import { RowStatusModel } from '../../../interfaces/RowStatusModel';

@Injectable({
  providedIn: 'root'
})
export class DepositService {
  constructor(private _http: HttpClient) {
  }
  baseUrl: string = 'http://localhost:8082/api/deposits';
  public getAllDeposits() {
    return this._http.get<DepositModel[]>(this.baseUrl);
  }
  public getDepositById(depositId: number) {
    return this._http.get<DepositModel>(`${this.baseUrl}/${depositId}`);
  }
  public createDeposit(depositModel:DepositModel){
      return this._http.post<DepositModel>(this.baseUrl,depositModel);
  }

  public changeDepositStatus(depositId:number,rowStatusModel:RowStatusModel){
    return this._http.put<RowStatusModel>(`${this.baseUrl}/${depositId}`,rowStatusModel);
  }

  public getAllDepositsByStatusId(statusId:number){
    return this._http.get<DepositModel[]>(`${this.baseUrl}/status/${statusId}`);
  }
  public getAllDepositsByAccounNumber(accountNumber:number){
    return this._http.get<DepositModel[]>(`${this.baseUrl}/customer/${accountNumber}`);
  }

}
