import { AuthModel } from "../../../auth/domain/model/auth-model";

export class CustomerModel {
    id?: string;
    identification: string;
    name: string;
    authId?: string;
    authModel: AuthModel;
}