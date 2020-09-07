import { CustomerModel } from "./CustomerModel";
import { StatusModel } from "./StatusModel";
import { LoanTypeModel } from "./LoanTypeModel";

export interface LoanModel {
    id?: number;
    customerModel: CustomerModel;
    loanAmount: number;
    statusModel: StatusModel;
    loanTypeModel: LoanTypeModel;
}
