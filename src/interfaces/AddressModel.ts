import { BranchModel } from "./BranchModel";
import { UserModel } from "./UserModel";
import { CustomerModel } from "./CustomerModel";



export interface AddressModel {
    id ?: number;
    city: String;
    country: String;
    pinCode: number;
    street: String;

}
