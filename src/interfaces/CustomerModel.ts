import { AddressModel } from "./AddressModel";
import { AccountTypeModel } from "./AccountTypeModel";
import { BranchModel } from "./BranchModel";
import { StatusModel } from "./StatusModel";
import { DepositModel } from "./DepositModel";
import { WithdrawModel } from "./WithdrawModel";
import { TransferModel } from "./TransferModel";
import { LoanModel } from "./LoanModel";

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