import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { HotelRepositoryInterface } from "../../../hotel/domain/repository/hotel-repository.interface";
import { HotelEntity } from "../entity/hotel-entity";

@Injectable()
export class HotelRepository implements HotelRepositoryInterface {

    private readonly logger = new Logger("HotelRepository");

    constructor(
        @InjectRepository(HotelEntity)
        private readonly hotelRepository: Repository<HotelEntity>,
      ) {}

    async get(): Promise<HotelEntity[]>{
        return await this.hotelRepository.find();
    }

    async getById(id: string): Promise<HotelEntity | null>{
        return await this.hotelRepository.findOneBy({id: id});
    }

    async getByCountryAndCity(country: string, city: string): Promise<HotelEntity[]>{
        return await this.hotelRepository.findBy({country: country, city: city});
    }

    async create(hotelEntity: HotelEntity): Promise<HotelEntity>{
        this.hotelRepository.create(hotelEntity);
        return await this.hotelRepository.save(hotelEntity);
    }

    async update(hotelEntity: HotelEntity): Promise<HotelEntity>{
        return await this.hotelRepository.save(hotelEntity);
    }

    async delete(hotelEntity: HotelEntity): Promise<void>{
        await this.hotelRepository.delete(hotelEntity);
    }
}