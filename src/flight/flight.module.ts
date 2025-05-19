import { Module } from '@nestjs/common';
import { FlightController } from './controller/flight.controller';
import { FlightService } from './service/flight.service';
import { Flight } from './entity/flight.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [TypeOrmModule.forFeature([Flight])],
    controllers: [FlightController],
    providers: [FlightService,],
})
export class FlightModule {}