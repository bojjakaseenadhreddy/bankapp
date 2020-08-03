import { EligibilityModel } from "./EligibilityModel";

import { LoanTypeModel } from "./LoanTypeModel";

export interface AccountTypeModel {
    id: number;
    name: String;
    interest: number;
    minBalance: number;
    withdrawLimit: number;
    transactionLimit: number;
    eligibilityModel: EligibilityModel;
    loanTypeModels: Set<LoanTypeModel>;
}
