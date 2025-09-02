import { AuthMapper } from "../../../auth/infrastructure/mapper/auth-mapper";
import { Customer } from "../../domain/model/customer";
import { CustomerEntity } from "../entity/customer-entity";

export class CustomerMapper{
    
    static modelToEntity(customer: Customer): CustomerEntity {
        return {
            id: customer.id,
            identification: customer.identification,
            name: customer.name,
            authEntity: AuthMapper.modelToEntity(customer.auth!)
        };
    }

    static entityToModel(customerEntity: CustomerEntity): Customer {
        return {
            id: customerEntity.id!,
            identification: customerEntity.identification,
            name: customerEntity.name,
            auth : AuthMapper.entityToModel(customerEntity.authEntity)
        };
    }
}