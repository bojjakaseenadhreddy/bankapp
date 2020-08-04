import { AddressModel } from "./AddressModel";

import { BranchModel } from "./BranchModel";

import { RoleModel } from "./RoleModel";

import { RowStatusModel } from "./RowStatusModel";

export interface UserModel {
    id?: number;
    name: String;
    phone: number;
    email: String;
    password: String;
    gender: String;
    createdDate?: Date;
    addressModel?: AddressModel;
    branchModel?: BranchModel;
    roleModel?: RoleModel;
    rowStatusModel?: RowStatusModel;
}