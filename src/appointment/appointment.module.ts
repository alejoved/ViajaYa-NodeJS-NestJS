import { Module } from '@nestjs/common';
import { AppointmentController } from './controller/appointment.controller';
import { AppointmentService } from './service/appointment.service';
import { Appointment } from './entity/appoinment.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [TypeOrmModule.forFeature([Appointment])],
    controllers: [AppointmentController],
    providers: [AppointmentService],
})
export class AppointmentModule {}