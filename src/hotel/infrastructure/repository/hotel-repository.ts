import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { HotelRepositoryInterface } from "../../domain/repository/hotel-repository.interface";
import { Hotel } from "../entity/hotel";
import { HotelModel } from "src/hotel/domain/model/hotel-model";
import { HotelMapper } from "../mapper/hotel-mapper";
import { Constants } from "src/common/constants";

@Injectable()
export class HotelRepository implements HotelRepositoryInterface {

    private readonly logger = new Logger("HotelRepository");

    constructor(
        @InjectRepository(Hotel)
        private readonly hotelRepository: Repository<Hotel>,
      ) {}

    async get(): Promise<HotelModel[]>{
        const hotel = await this.hotelRepository.find();
        return hotel.map(HotelMapper.entityToModel);
    }

    async getById(id: string): Promise<HotelModel>{
        const hotel = await this.hotelRepository.findOneBy({id: id});
        if(!hotel){
            throw new NotFoundException(Constants.hotelNotFound);
        }
        return HotelMapper.entityToModel(hotel);
    }

    async getByCountryAndCity(country: string, city: string): Promise<HotelModel[]>{
        const hotel = await this.hotelRepository.findBy({country: country, city: city});
        return hotel.map(HotelMapper.entityToModel);
    }

    async create(hotelModel: HotelModel): Promise<HotelModel>{
        const hotel = HotelMapper.modelToEntity(hotelModel);
        this.hotelRepository.create(hotelModel);
        const response = await this.hotelRepository.save(hotel);
        return HotelMapper.entityToModel(response);        
    }

    async update(hotelModel: HotelModel): Promise<HotelModel>{
        const hotel = HotelMapper.modelToEntity(hotelModel);
        const response = await this.hotelRepository.save(hotel);
        return HotelMapper.entityToModel(response);
    }

    async delete(id: string): Promise<void>{
        const hotel = await this.hotelRepository.findOneBy({id:id});
        if(!hotel){
            throw new NotFoundException(Constants.hotelNotFound);
        }
        await this.hotelRepository.delete(hotel);
    }
}