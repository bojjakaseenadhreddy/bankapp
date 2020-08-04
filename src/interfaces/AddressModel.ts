import { BranchModel } from "./BranchModel";
import { UserModel } from "./UserModel";
import { CustomerModel } from "./CustomerModel";



export interface AddressModel {
    id ?: number;
    country: String;
    state:string;
    city: String;
    pinCode: number;
    street: String;
}
