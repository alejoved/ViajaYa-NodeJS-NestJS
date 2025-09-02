import { Module } from '@nestjs/common';
import { CustomerController } from './adapter/controller/customer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from './infrastructure/entity/customer-entity';
import { Auth } from '../auth/infrastructure/entity/auth-entity';
import { CustomerGetUseCase } from './application/usecase/customer-get-usecase';
import { CustomerCreateUseCase } from './application/usecase/customer-create-usecase';
import { CustomerUpdateUseCase } from './application/usecase/customer-update-usecase';
import { CustomerDeleteUseCase } from './application/usecase/customer-delete-usecase';
import { CustomerRepository } from './infrastructure/repository/customer-repository';

@Module({
    imports: [TypeOrmModule.forFeature([Customer]), TypeOrmModule.forFeature([Auth])],
    controllers: [CustomerController],
    providers: [{provide: "CustomerGetUseCaseInterface", useClass: CustomerGetUseCase}, 
                {provide: "CustomerCreateUseCaseInterface", useClass: CustomerCreateUseCase},
                {provide: "CustomerUpdateUseCaseInterface", useClass: CustomerUpdateUseCase},
                {provide: "CustomerDeleteUseCaseInterface", useClass: CustomerDeleteUseCase},
                {provide: "CustomerRepositoryInterface", useClass: CustomerRepository}],
})
export class CustomerModule {}