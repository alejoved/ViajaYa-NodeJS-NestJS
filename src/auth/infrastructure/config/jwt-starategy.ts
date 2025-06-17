import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Auth } from "../entity/auth-entity";

@Injectable()
export class JwtStrategy extends PassportStrategy (Strategy) {

    constructor(
        @InjectRepository(Auth)
        private readonly authRepository: Repository<Auth>
    ){
        super({
            secretOrKey: process.env.JWT_SECRET!,
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        });
    }

    async validate(payload: any): Promise<Auth>{
        const auth = await this.authRepository.findOneBy({email: payload.email});
        if (!auth){
            throw new UnauthorizedException();
        }
        return auth;
    }

}