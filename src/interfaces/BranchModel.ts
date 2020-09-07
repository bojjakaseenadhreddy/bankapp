import { AddressModel } from "./AddressModel";
import { UserModel } from "./UserModel";
import { CustomerModel } from "./CustomerModel";
import { RowStatusModel } from "./RowStatusModel";

export interface BranchModel {
    branchCode?: number;
    name: string;
    addressModel: AddressModel;
    phoneNo: number;
    createdDate?: Date;
    rowStatusModel: RowStatusModel;
}


