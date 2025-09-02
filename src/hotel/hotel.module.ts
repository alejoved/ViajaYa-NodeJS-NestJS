import { Module } from '@nestjs/common';
import { Hotel } from './infrastructure/entity/hotel-entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HotelController } from './adapter/controller/hotel.controller';
import { HotelGetUseCase } from './application/usecase/hotel-get-usecase';
import { HotelCreateUseCase } from './application/usecase/hotel-create-usecase';
import { HotelUpdateUseCase } from './application/usecase/hotel-update-usecase';
import { HotelDeleteUseCase } from './application/usecase/hotel-delete-usecase';
import { HotelRepository } from './infrastructure/repository/hotel-repository';

@Module({
    imports: [TypeOrmModule.forFeature([Hotel])],
    controllers: [HotelController],
    providers: [{provide: "HotelGetUseCaseInterface", useClass: HotelGetUseCase}, 
                {provide: "HotelCreateUseCaseInterface", useClass: HotelCreateUseCase},
                {provide: "HotelUpdateUseCaseInterface", useClass: HotelUpdateUseCase},
                {provide: "HotelDeleteUseCaseInterface", useClass: HotelDeleteUseCase},
                {provide: "HotelRepositoryInterface", useClass: HotelRepository}],
})
export class HotelModule {}