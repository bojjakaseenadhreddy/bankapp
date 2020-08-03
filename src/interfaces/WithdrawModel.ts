import { StatusModel } from "./StatusModel";

export interface WithdrawModel {

    id?: number;
    customerModelCustomerModel;
    withdrawAmount: number;
    withdrawDate: Date;
    statusModel: StatusModel;

}
