import { ICRUD } from "src/common/ICRUD";
import { CustomerDTO } from "../dto/customer.dto";
import { CustomerResponseDTO } from "../dto/customer-response.dto";

export interface CustomerInterface extends ICRUD<CustomerDTO,  CustomerResponseDTO>{
    getByEmail(email: string): Promise<CustomerResponseDTO>
}