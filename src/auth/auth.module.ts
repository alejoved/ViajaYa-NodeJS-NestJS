import { Module } from '@nestjs/common';
import { AuthController } from './controller/auth.controller';
import { AuthService } from './service/auth.service';
import { Auth } from './entity/auth.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtStrategy } from './service/jwt-starategy';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
    imports: [TypeOrmModule.forFeature([Auth]),
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
    providers: [AuthService, JwtStrategy]
})
export class AuthModule {}