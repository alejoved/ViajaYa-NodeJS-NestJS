import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { HotelRepositoryInterface } from "../../domain/repository/hotel-repository.interface";
import { HotelEntity } from "../entity/hotel-entity";
import { Hotel } from "src/hotel/domain/model/hotel";
import { HotelMapper } from "../mapper/hotel-mapper";
import { Constants } from "src/common/constants";

@Injectable()
export class HotelRepository implements HotelRepositoryInterface {

    private readonly logger = new Logger("HotelRepository");

    constructor(
        @InjectRepository(HotelEntity)
        private readonly hotelRepository: Repository<HotelEntity>,
      ) {}

    async get(): Promise<Hotel[]>{
        const hotel = await this.hotelRepository.find();
        return hotel.map(HotelMapper.entityToModel);
    }

    async getById(id: string): Promise<Hotel>{
        const hotelEntity = await this.hotelRepository.findOneBy({id: id});
        if(!hotelEntity){
            throw new NotFoundException(Constants.hotelNotFound);
        }
        return HotelMapper.entityToModel(hotelEntity);
    }

    async getByCountryAndCity(country: string, city: string): Promise<Hotel[]>{
        const hotelEntity = await this.hotelRepository.findBy({country: country, city: city});
        return hotelEntity.map(HotelMapper.entityToModel);
    }

    async create(hotel: Hotel): Promise<Hotel>{
        const hotelEntity = HotelMapper.modelToEntity(hotel);
        this.hotelRepository.create(hotelEntity);
        const response = await this.hotelRepository.save(hotel);
        return HotelMapper.entityToModel(response);        
    }

    async update(hotel: Hotel): Promise<Hotel>{
        const hotelEntity = HotelMapper.modelToEntity(hotel);
        const response = await this.hotelRepository.save(hotelEntity);
        return HotelMapper.entityToModel(response);
    }

    async delete(id: string): Promise<void>{
        const hotelEntity = await this.hotelRepository.findOneBy({id:id});
        if(!hotelEntity){
            throw new NotFoundException(Constants.hotelNotFound);
        }
        await this.hotelRepository.delete(hotelEntity);
    }
}