import { AddressModel } from "./AddressModel";
import { AccountTypeModel } from "./AccountTypeModel";
import { BranchModel } from "./BranchModel";
import { StatusModel } from "./StatusModel";
export interface CustomerModel {
    accountNo?: number;
    name: String;
    dob: Date;
    email: String;
    password: String;
    confirmPassword: String;
    branchModel: BranchModel;
    statusModel: StatusModel;
    accountCreatedDate: Date;
    accountTypeModel: AccountTypeModel;

}