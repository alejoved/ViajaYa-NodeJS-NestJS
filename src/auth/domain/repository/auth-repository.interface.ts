import { AuthModel } from "../model/auth-model";

export interface AuthRepositoryInterface {
    get(): Promise<AuthModel[]>;
    getByEmail(email: string): Promise<AuthModel>;
    create(auth: AuthModel): Promise<AuthModel>
}