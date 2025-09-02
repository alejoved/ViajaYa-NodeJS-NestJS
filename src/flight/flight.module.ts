import { Module } from '@nestjs/common';
import { FlightEntity } from './infrastructure/entity/flight-entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FlightGetUseCase } from './application/usecase/flight-get-usecase';
import { FlightCreateUseCase } from './application/usecase/flight-create-usecase';
import { FlightUpdateUseCase } from './application/usecase/flight-update-usecase';
import { FlightDeleteUseCase } from './application/usecase/flight-delete-usecase';
import { FlightRepository } from './infrastructure/repository/flight-repository';
import { FlightController } from './adapter/controller/flight.controller';

@Module({
    imports: [TypeOrmModule.forFeature([FlightEntity])],
    controllers: [FlightController],
    providers: [{provide: "FlightGetUseCaseInterface", useClass: FlightGetUseCase}, 
                {provide: "FlightCreateUseCaseInterface", useClass: FlightCreateUseCase},
                {provide: "FlightUpdateUseCaseInterface", useClass: FlightUpdateUseCase},
                {provide: "FlightDeleteUseCaseInterface", useClass: FlightDeleteUseCase},
                {provide: "FlightRepositoryInterface", useClass: FlightRepository}],
})
export class FlightModule {}