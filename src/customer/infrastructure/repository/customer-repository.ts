import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CustomerRepositoryInterface } from "../../domain/repository/customer-repository.interface";
import { CustomerEntity } from "../entity/customer-entity";
import { Constants } from "../../../common/constants";
import { Customer } from "../../domain/model/customer";
import { CustomerMapper } from "../mapper/customer-mapper";

@Injectable()
export class CustomerRepository implements CustomerRepositoryInterface {

    private readonly logger = new Logger("CustomerRepository");

    constructor(
        @InjectRepository(CustomerEntity)
        private readonly customerRepository: Repository<CustomerEntity>,
      ) {}

    async get(): Promise<Customer[]>{
        const customerEntity = await this.customerRepository.find({relations: ['authEntity']});
        return customerEntity.map(CustomerMapper.entityToModel);
    }

    async getById(id: string): Promise<Customer>{
        const customerEntity = await this.customerRepository.findOneBy({id: id});
        if(!customerEntity){
            throw new NotFoundException(Constants.customerNotFound);
        }
        return CustomerMapper.entityToModel(customerEntity);
    }

    async getByEmail(email: string): Promise<Customer>{
        const customer = await this.customerRepository.findOne({where: { authEntity: {email: email}}, relations: ['authEntity']});
        if(!customer){
            throw new NotFoundException(Constants.customerNotFound);
        }
        return CustomerMapper.entityToModel(customer);
    }

    async create(customer: Customer): Promise<Customer>{
        const customerEntity = CustomerMapper.modelToEntity(customer);
        this.customerRepository.create(customerEntity);
        const response = await this.customerRepository.save(customerEntity);
        return CustomerMapper.entityToModel(response);
    }

    async update(customer: Customer, id: string): Promise<Customer>{
        const customerEntity = CustomerMapper.modelToEntity(customer);
        const preload = await this.customerRepository.preload({
            id, // importante, preload necesita el id
            ...customerEntity, // solo los campos enviados se mergean
        });
        if (!preload) {
            throw new NotFoundException(Constants.customerNotFound);
        }
        const response = await this.customerRepository.save(preload);
        return CustomerMapper.entityToModel(response);
    }

    async delete(id: string): Promise<void>{
        const customerEntity = await this.customerRepository.findOneBy({id: id});
        if(!customerEntity){
            throw new NotFoundException(Constants.customerNotFound);
        }
        await this.customerRepository.delete(customerEntity);
    }
}