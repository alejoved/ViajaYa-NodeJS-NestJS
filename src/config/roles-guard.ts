import { BadRequestException, CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { Auth } from "../auth/entity/auth.entity";

@Injectable()
export class RolesGuard implements CanActivate{

    constructor(private readonly reflector: Reflector){
        
    }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const validRoles: string[] = this.reflector.get( "roles", context.getHandler() );
        if(!validRoles || validRoles.length === 0) return true;
        const req = context.switchToHttp().getRequest();
        const auth = req.user as Auth;
        if(!auth){
            throw new BadRequestException("USER NOT FOUND");
        }
        if(!auth.role){
            throw new BadRequestException("USER WITHOUT ROLES");
        }
        if(validRoles.includes(auth.role.toString())){
            return true;
        }
        throw new ForbiddenException("ACCESS NOT ALLOWED.")
    }
}