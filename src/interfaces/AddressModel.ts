import { BranchModel } from "./BranchModel";
import { UserModel } from "./UserModel";
import { CustomerModel } from "./CustomerModel";


export interface AddressModel {
    id ?: number;
    country: string;
    state:string;
    city: string;
    pinCode: number;
    street: string;
}

