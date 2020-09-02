import { EligibilityModel } from "./EligibilityModel";


export interface AccountTypeModel {
    id?: number;
    name: string;
    interest: number;
    minBalance: number;
    withdrawLimit: number;
    transactionLimit: number;
    eligibilityModel: EligibilityModel;
}
