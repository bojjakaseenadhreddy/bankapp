import { CustomerModel } from "./CustomerModel";
import { StatusModel } from "./StatusModel";

export interface DepositModel {
    id?: number;
    depositAmount: number;
    statusModel: StatusModel;
    transactionDate: Date;
    customerModel: CustomerModel;

}
