import { Module } from '@nestjs/common';
import { HotelController } from './controller/hotel.controller';
import { HotelService } from './service/hotel.service';
import { Hotel } from './entity/hotel.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Auth } from 'src/auth/entity/auth.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Hotel])],
    controllers: [HotelController],
    providers: [HotelService],
})
export class HotelModule {}