import { Module } from '@nestjs/common';
import { CustomerController } from './controller/customer.controller';
import { CustomerService } from './service/customer.service';
import { Customer } from './entity/customer.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Auth } from 'src/auth/entity/auth.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Customer]), TypeOrmModule.forFeature([Auth])],
    controllers: [CustomerController],
    providers: [CustomerService],
})
export class CustomerModule {}