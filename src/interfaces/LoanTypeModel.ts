import { EligibilityModel } from "./EligibilityModel";
import { AccountTypeModel } from "./AccountTypeModel";
import { RowStatusModel } from "./RowStatusModel";

export interface LoanTypeModel {

    id?: number;
    name: String;
    interest: number;
    months: number;
    eligibilityModel: EligibilityModel;
    minAmount: number;
    maxAmount: number;
    rowStatusModel: RowStatusModel;
    accountTypeModel: AccountTypeModel;

}
