import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Auth } from "../entity/auth.entity";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class JwtStrategy extends PassportStrategy (Strategy) {

    constructor(
        @InjectRepository(Auth)
        private readonly authRepository: Repository<Auth>,
        configService: ConfigService
    ){
        super({
            secretOrKey: configService.get<string>('JWT_SECRET')!,
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        });
    }

    async validate(identification: string): Promise<Auth>{
        const auth = await this.authRepository.findOneBy({identification: identification});
        if (!auth){
            throw new UnauthorizedException("TOKEN NOT VALID");
        }
        return auth;
    }

}