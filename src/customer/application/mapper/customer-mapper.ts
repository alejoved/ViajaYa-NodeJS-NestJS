import { CustomerResponseDTO } from "../../../customer/interface/rest/dto/customer-response-dto";
import { CustomerModel } from "../../../customer/domain/model/customer-model";
import { CustomerEntity } from "../../../customer/infrastructure/model/customer-entity";
import { CustomerDTO } from "../../../customer/interface/rest/dto/customer-dto";

export class CustomerMapper{
    static dtoToModel(customerDTO: CustomerDTO): CustomerModel {
        return {
            identification: customerDTO.identification,
            name: customerDTO.name,
            authModel : {email: customerDTO.email, password: customerDTO.password}
        };
    }

    static modelToEntity(customerModel: CustomerModel): CustomerEntity {
        return {
            identification: customerModel.identification,
            name: customerModel.name,
            authEntity : {email: customerModel.authModel.email, password: customerModel.authModel.password}
        };
    }

    static entityToModel(customerEntity: CustomerEntity): CustomerModel {
        return {
            id: customerEntity.id,
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
            id: customerModel.id,
            identification: customerModel.identification,
            name: customerModel.name,
            email : customerModel.authModel.email
        };
    }
}