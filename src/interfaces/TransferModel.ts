import { CustomerModel } from "./CustomerModel";

import { StatusModel } from "./StatusModel";

export interface TransferModel {
    id?: number;
    customerModel: CustomerModel;
    receiverAccountNumber: number;
    amount: number;
    statusModel: StatusModel;
    transferDate: Date;

}
