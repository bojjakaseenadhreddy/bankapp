import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { TransferModel } from "../../../interfaces/TransferModel";
import { RowStatusModel } from "../../../interfaces/RowStatusModel";

@Injectable({
  providedIn: 'root'
})
export class TransferService {
  constructor(private _http: HttpClient) {
  }
  baseUrl: string = 'http://localhost:8082/api/transfers';
  public getAllTransfers() {
    return this._http.get<TransferModel[]>(this.baseUrl);
  }
  public getTransferById(transferId: number) {
    return this._http.get<TransferModel>(`${this.baseUrl}/${transferId}`);
  }
  public createTransfer(transferModel:TransferModel){
      return this._http.post<TransferModel>(this.baseUrl,transferModel);
  }

  public changeTransferStatus(transferId:number,rowStatusModel:RowStatusModel){
    return this._http.put<TransferModel>(`${this.baseUrl}/${transferId}`,rowStatusModel);
  }

  public getAllTransfersByStatusId(statusId:number){
    return this._http.get<TransferModel[]>(`${this.baseUrl}/status/${statusId}`);
  }
  public getAllTransfersByAccounNumber(accountNumber:number){
    return this._http.get<TransferModel[]>(`${this.baseUrl}/customer/${accountNumber}`);
  }


}
