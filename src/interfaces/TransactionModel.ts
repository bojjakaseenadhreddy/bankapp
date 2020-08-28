import { StatusModel } from "./StatusModel";

export interface TransactionModel {
  date:Date;
  status:StatusModel;
  money:number;
  type:string;
}
