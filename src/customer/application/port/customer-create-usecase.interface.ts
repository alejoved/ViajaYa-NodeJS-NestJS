import { CustomerModel } from "src/customer/domain/model/customer-model";

export interface CustomerCreateUseCaseInterface {
  execute(customerModel: CustomerModel): Promise<CustomerModel>;
}