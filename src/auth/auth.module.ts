import { Module } from '@nestjs/common';
import { AuthController } from './controller/auth.controller';
import { AuthService } from './service/auth.service';
import { Auth } from './entity/auth.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [TypeOrmModule.forFeature([Auth])],
    controllers: [AuthController],
    providers: [AuthService],
})
export class AuthModule {}