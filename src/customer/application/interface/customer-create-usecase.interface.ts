import { CustomerModel } from "../../domain/model/customer-model";

export interface CustomerCreateUseCaseInterface {
  execute(customerModel: CustomerModel): Promise<CustomerModel>;
}