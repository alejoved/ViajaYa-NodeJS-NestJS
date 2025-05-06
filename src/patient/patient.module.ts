import { Module } from '@nestjs/common';
import { PatientController } from './controller/patient.controller';
import { PatientService } from './service/patient.service';
import { Patient } from './entity/patient.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Auth } from 'src/auth/entity/auth.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Patient]), TypeOrmModule.forFeature([Auth])],
    controllers: [PatientController],
    providers: [PatientService,],
})
export class PatientModule {}