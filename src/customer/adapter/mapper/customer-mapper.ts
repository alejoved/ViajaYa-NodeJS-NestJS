import { CustomerResponseDTO } from "../../adapter/dto/customer-response-dto";
import { Customer } from "../../domain/model/customer";
import { CustomerDTO } from "../../adapter/dto/customer-dto";

export class CustomerMapper{
    static dtoToModel(customerDTO: CustomerDTO): Customer {
            return {
                identification: customerDTO.identification,
                name: customerDTO.name,
                auth:{
                    email: customerDTO.email,
                    password: customerDTO.password    
                }
            };
        }
    static modelToDto(customer: Customer): CustomerResponseDTO {
        return {
            id: customer.id!,
            identification: customer.identification,
            name: customer.name,
            email : customer.auth.email
        };
    }
}