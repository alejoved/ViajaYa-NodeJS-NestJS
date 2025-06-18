import { CustomerResponseDTO } from "../../adapter/dto/customer-response-dto";
import { CustomerModel } from "../../domain/model/customer-model";
import { CustomerDTO } from "../../adapter/dto/customer-dto";

export class CustomerMapper{
    static dtoToModel(customerDTO: CustomerDTO): CustomerModel {
            return {
                identification: customerDTO.identification,
                name: customerDTO.name,
                authModel:{
                    email: customerDTO.email,
                    password: customerDTO.password    
                }
            };
        }
    static modelToDto(customerModel: CustomerModel): CustomerResponseDTO {
        return {
            id: customerModel.id!,
            identification: customerModel.identification,
            name: customerModel.name,
            email : customerModel.authModel.email
        };
    }
}