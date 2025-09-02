import { Auth } from "../model/auth";

export interface AuthRepositoryInterface {
    get(): Promise<Auth[]>;
    getByEmail(email: string): Promise<Auth>;
    create(auth: Auth): Promise<Auth>
}