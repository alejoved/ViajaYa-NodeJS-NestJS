import { Module } from '@nestjs/common';
import { PhysicianController } from './controller/physician.controller';
import { PhysicianService } from './service/physician.service';
import { Physician } from './entity/physician.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Auth } from 'src/auth/entity/auth.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Physician]), TypeOrmModule.forFeature([Auth])],
    controllers: [PhysicianController],
    providers: [PhysicianService],
})
export class PhysicianModule {}