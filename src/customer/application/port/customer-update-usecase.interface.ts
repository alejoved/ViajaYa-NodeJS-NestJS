import { CustomerModel } from "src/customer/domain/model/customer-model";
import { CustomerUpdateCommand } from "../command/customer-update-command";

export interface CustomerUpdateUseCaseInterface {
  execute(command: CustomerUpdateCommand): Promise<CustomerModel>;
}