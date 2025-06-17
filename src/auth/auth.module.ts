import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtStrategy } from './infrastructure/config/jwt-starategy';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthController } from './interface/rest/controller/auth.controller';
import { LoginUseCase } from './application/usecase/login-usecase';
import { RegisterUseCase } from './application/usecase/register-usecase';
import { AuthRepository } from './infrastructure/repository/auth-repository';
import { AuthEntity } from './infrastructure/entity/auth-entity';

@Module({
    imports: [TypeOrmModule.forFeature([AuthEntity]),
    PassportModule.register({defaultStrategy: "jwt"}),
    JwtModule.registerAsync({
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: async (configService: ConfigService) => ({
          secret: configService.get<string>('JWT_SECRET'),
          signOptions: { expiresIn: '2h' },
        }),
      }),],
    controllers: [AuthController],
    providers: [JwtStrategy, 
      {provide: "LoginUseCaseInterface", useClass: LoginUseCase}, 
      {provide: "RegisterUseCaseInterface", useClass: RegisterUseCase},
      {provide: "AuthRepositoryInterface", useClass: AuthRepository}],
    
})
export class AuthModule {}