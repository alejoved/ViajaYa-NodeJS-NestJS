import { CustomerModel } from "../../domain/model/customer-model";

export interface CustomerCreateUseCaseInterface {
  execute(customerCreateModel: CustomerModel): Promise<CustomerModel>;
}