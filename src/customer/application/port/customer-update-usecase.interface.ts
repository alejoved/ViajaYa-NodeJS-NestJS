import { CustomerModel } from "src/customer/domain/model/customer-model";

export interface CustomerUpdateUseCaseInterface {
  execute(customerModel: CustomerModel, id: string): Promise<CustomerModel>;
}