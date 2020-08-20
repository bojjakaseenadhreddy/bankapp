import { StatusModel } from "./StatusModel";
import { CustomerModel } from "./CustomerModel";

export interface WithdrawModel {

    id?: number;
    customerModel:CustomerModel;
    withdrawAmount: number;
    withdrawDate: Date;
    statusModel: StatusModel;

}
