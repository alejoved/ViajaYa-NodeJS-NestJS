import { Auth } from "../../../auth/domain/model/auth";

export class Customer {
    id: string;
    identification: string;
    name: string;
    auth?: Auth;
}