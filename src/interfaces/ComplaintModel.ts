import { StatusModel } from "./StatusModel";

import { CustomerModel } from "./CustomerModel";

export interface ComplaintModel {
    id?: number;
    description: string;
    statusModel: StatusModel;
    raisedDate: Date;
    updatedDate: Date;
    customerModel: CustomerModel;

}
