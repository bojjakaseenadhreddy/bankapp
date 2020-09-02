import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { WithdrawModel } from "../../../interfaces/WithdrawModel";
import { RowStatusModel } from "../../../interfaces/RowStatusModel";

@Injectable({
  providedIn: 'root'
})
export class WithdrawService{
  constructor(private _http: HttpClient) {
  }
  baseUrl: string = 'http://localhost:8082/api/withdraws';
  public getAllWithdraws() {
    return this._http.get<WithdrawModel[]>(this.baseUrl);
  }
  public getWithdrawById(withdrawId: number) {
    return this._http.get<WithdrawModel>(`${this.baseUrl}/${withdrawId}`);
  }
  public createWithdraw(withdrawModel:WithdrawModel){
      return this._http.post<WithdrawModel>(this.baseUrl,withdrawModel);
  }

  public changeWithdrawStatus(withdrawId:number,rowStatusModel:RowStatusModel){
    return this._http.put<WithdrawModel>(`${this.baseUrl}/${withdrawId}`,rowStatusModel);
  }

  public getAllWithdrawsByStatusId(statusId:number){
    return this._http.get<WithdrawModel[]>(`${this.baseUrl}/status/${statusId}`);
  }
  public getAllWithdrawsByAccounNumber(accountNumber:number){
    return this._http.get<WithdrawModel[]>(`${this.baseUrl}/customer/${accountNumber}`);
  }

}
