import { CustomerModel } from "../../domain/model/customer-model";

export interface CustomerUpdateUseCaseInterface {
  execute(customerUpdateModel: CustomerModel, id: string): Promise<CustomerModel>;
}