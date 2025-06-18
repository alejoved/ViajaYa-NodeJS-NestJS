import { CustomerModel } from "../../domain/model/customer-model";
import { Customer } from "../../infrastructure/entity/customer";

export class CustomerMapper{
    
    static modelToEntity(customerModel: CustomerModel): Customer {
        return {
            identification: customerModel.identification,
            name: customerModel.name,
            auth: {
                email: customerModel.authModel.email, 
                password: customerModel.authModel.password,
                role: customerModel.authModel.role!
            }
        };
    }

    static entityToModel(customerEntity: Customer): CustomerModel {
        return {
            id: customerEntity.id!,
            identification: customerEntity.identification,
            name: customerEntity.name,
            authModel : {
                email: customerEntity.auth.email, 
                password: customerEntity.auth.password, 
                role: customerEntity.auth.role
            }
        };
    }
}