import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CustomerInterface } from "./customer.interface";
import { Customer } from "../entity/customer.entity";
import { CustomerResponseDTO } from "../dto/customer-response.dto";
import { CustomerDTO } from "../dto/customer.dto";
import { plainToInstance } from "class-transformer";
import { Constants } from "src/common/constants";
import { Auth } from "src/auth/entity/auth.entity";
import { Role } from "src/common/role";
import { hashSync } from "bcrypt";

@Injectable()
export class CustomerService implements CustomerInterface {

    private readonly logger = new Logger("CustomerService");

    constructor(
        @InjectRepository(Customer)
        private readonly customerRepository: Repository<Customer>,
        @InjectRepository(Auth)
        private readonly authRepository: Repository<Auth>,
      ) {}

    async getAll(): Promise<CustomerResponseDTO[]> {
        const customers = await this.customerRepository.find({relations: ['auth']});
        const customerResponseDTO = plainToInstance(CustomerResponseDTO, customers, { excludeExtraneousValues: true })
        return customerResponseDTO;
    }

    async getById(id: string): Promise<CustomerResponseDTO> {
        const customer = await this.customerRepository.findOne({where: { id }, relations: ['auth']});
        if (!customer){
            throw new NotFoundException(Constants.customerNotFound);
        }
        const customerResponseDTO = plainToInstance(CustomerResponseDTO, customer, { excludeExtraneousValues: true })
        return customerResponseDTO;
    }

    async getByEmail(email: string): Promise<CustomerResponseDTO> {
        const customer = await this.customerRepository.findOne({where: { auth: {email: email}}, relations: ['auth']});
        if (!customer){
            throw new NotFoundException(Constants.customerNotFound);
        }
        const customerResponseDTO = plainToInstance(CustomerResponseDTO, customer, { excludeExtraneousValues: true })
        return customerResponseDTO;
    }

    async create(customerDTO: CustomerDTO): Promise<CustomerResponseDTO> {
        const password = hashSync(customerDTO.password, 3); 
        const auth = plainToInstance(Auth, customerDTO, { excludeExtraneousValues: true });
        auth.role = Role.CUSTOMER;
        auth.password = password;
        const customer = plainToInstance(Customer, customerDTO, { excludeExtraneousValues: true });
        customer.auth = auth;
        this.customerRepository.create(customer);
        await this.customerRepository.save(customer);
        const customerResponseDTO = plainToInstance(CustomerResponseDTO, customer, { excludeExtraneousValues: true })
        return customerResponseDTO;
    }

    async update(customerDTO: CustomerDTO, id: string): Promise<CustomerResponseDTO> {
        const customerExists = await this.customerRepository.findOneBy({id: id});
        if (!customerExists){
            throw new NotFoundException(Constants.customerNotFound);
        }
        const customer = plainToInstance(Customer, customerDTO, { excludeExtraneousValues: true })
        customer.id = id;
        await this.customerRepository.save(customerDTO);
        const customerResponseDTO = plainToInstance(CustomerResponseDTO, customer, { excludeExtraneousValues: true })
        return customerResponseDTO;
    }

    async delete(id: string): Promise<void> {
        const customerExists = await this.customerRepository.findOneBy({id: id});
        if (!customerExists){
            throw new NotFoundException(Constants.customerNotFound);
        }
        await this.customerRepository.delete(customerExists);
    }

    
}