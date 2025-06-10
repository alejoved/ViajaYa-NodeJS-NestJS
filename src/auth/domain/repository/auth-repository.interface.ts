import { Auth } from "../../../auth/infrastructure/model/auth";

export interface AuthRepositoryInterface {
    get(): Promise<Auth[]>;
    getByEmail(email: string): Promise<Auth | null>;
    create(auth: Auth): Promise<Auth>
}