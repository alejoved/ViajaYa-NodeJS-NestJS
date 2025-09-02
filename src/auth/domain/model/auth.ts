import { Role } from "../../../common/role";

export class Auth {
    id?: string;
    email: string;
    password?: string;
    role?: Role;
}