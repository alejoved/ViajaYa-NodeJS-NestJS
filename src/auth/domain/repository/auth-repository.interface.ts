import { AuthEntity } from "../../infrastructure/persistence/entity/auth-entity";

export interface AuthRepositoryInterface {
    get(): Promise<AuthEntity[]>;
    getByEmail(email: string): Promise<AuthEntity | null>;
    create(authEntity: AuthEntity): Promise<AuthEntity>
}