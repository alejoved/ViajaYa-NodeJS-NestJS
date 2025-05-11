import { Module } from '@nestjs/common';
import { AppointmentController } from './controller/appointment.controller';
import { AppointmentService } from './service/appointment.service';
import { Appointment } from './entity/appoinment.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Physician } from 'src/physician/entity/physician.entity';
import { Patient } from 'src/patient/entity/patient.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Appointment]), TypeOrmModule.forFeature([Physician]), TypeOrmModule.forFeature([Patient])],
    controllers: [AppointmentController],
    providers: [AppointmentService],
})
export class AppointmentModule {}