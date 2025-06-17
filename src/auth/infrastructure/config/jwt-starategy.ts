import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { AuthEntity } from "../entity/auth-entity";

@Injectable()
export class JwtStrategy extends PassportStrategy (Strategy) {

    constructor(
        @InjectRepository(AuthEntity)
        private readonly authRepository: Repository<AuthEntity>
    ){
        super({
            secretOrKey: process.env.JWT_SECRET!,
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        });
    }

    async validate(payload: any): Promise<AuthEntity>{
        const auth = await this.authRepository.findOneBy({email: payload.email});
        if (!auth){
            throw new UnauthorizedException();
        }
        return auth;
    }

}