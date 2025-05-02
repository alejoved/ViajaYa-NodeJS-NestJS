import { Module } from '@nestjs/common';
import { PhysicianController } from './controller/physician.controller';
import { PhysicianService } from './service/physician.service';
import { Physician } from './entity/physician.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [TypeOrmModule.forFeature([Physician])],
    controllers: [PhysicianController],
    providers: [PhysicianService],
})
export class PhysicianModule {}