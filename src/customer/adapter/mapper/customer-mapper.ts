import { CustomerResponseDTO } from "../../adapter/dto/customer-response-dto";
import { CustomerModel } from "../../domain/model/customer-model";
import { CustomerEntity } from "../../infrastructure/entity/customer-entity";
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
    
    static modelToEntity(customerModel: CustomerModel): CustomerEntity {
        return {
            identification: customerModel.identification,
            name: customerModel.name,
            authEntity: {
                email: customerModel.authModel.email, 
                password: customerModel.authModel.password,
                role: customerModel.authModel.role!
            }
        };
    }

    static entityToModel(customerEntity: CustomerEntity): CustomerModel {
        return {
            id: customerEntity.id!,
            identification: customerEntity.identification,
            name: customerEntity.name,
            authModel : {
                email: customerEntity.authEntity.email, 
                password: customerEntity.authEntity.password, 
                role: customerEntity.authEntity.role
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