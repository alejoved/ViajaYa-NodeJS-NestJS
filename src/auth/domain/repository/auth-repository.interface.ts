import { AuthModel } from "../model/auth-model";

export interface AuthRepositoryInterface {
    get(): Promise<AuthModel[]>;
    getByEmail(email: string): Promise<AuthModel | null>;
    create(auth: AuthModel): Promise<AuthModel>
}