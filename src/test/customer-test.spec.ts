import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../app.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from '../customer/entity/customer.entity';
import { RegisterDTO } from '../auth/dto/register.dto';
import { LoginDTO } from '../auth/dto/login.dto';
import { Auth } from '../auth/entity/auth.entity';
import { CustomerDTO } from '../customer/dto/customer.dto';
import { Role } from '../common/role';

describe('CustomerController', () => {
  let app: INestApplication;
  const timeout = 90000
  let customerRepository: Repository<Customer>;
  let authRepository: Repository<Auth>;
  let accessToken = null;
  let customerDB: Customer;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
        imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
        customerRepository = moduleFixture.get<Repository<Customer>>(getRepositoryToken(Customer));
        authRepository = moduleFixture.get<Repository<Auth>>(getRepositoryToken(Auth));

        const registerDTO = new RegisterDTO();
        registerDTO.email = "ADMIN1@GMAIL.COM";
        registerDTO.password = "12345";
        await request(app.getHttpServer())
            .post('/auth/register')
            .send(registerDTO)
            .expect(201)
        

        const loginDTO = new LoginDTO();
        loginDTO.email = "ADMIN1@GMAIL.COM";
        loginDTO.password = "12345";
        const responseLogin = await request(app.getHttpServer())
            .post('/auth/login')
            .send(loginDTO)
            .expect(200)
        accessToken = responseLogin.body.token;

        customerDB = new Customer();
        customerDB.identification = "1053847610";
        customerDB.name = "Test Name";
        customerDB.auth = new Auth();
        customerDB.auth.email = "CUSTOMER1@GMAIL.COM";
        customerDB.auth.password = "12345";
        customerDB.auth.role = Role.CUSTOMER;
        customerDB = await customerRepository.save(customerDB);

    }, timeout);

    afterAll(async () => {
      await customerRepository.delete({});
      await authRepository.delete({})
      await app.close();
        
    }, timeout);

  it('/customer (GET)', async () => {
    const customer = await customerRepository.save(customerDB);
    const response = await request(app.getHttpServer())
        .get('/customer')
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200)

        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBeGreaterThan(0);

        expect(response.body[0].identification).toBe(customer.identification);
        expect(response.body[0].name).toBe(customer.name);
  }, timeout);

  it('/customer/:id (GET)', async () => {
    const customer = await customerRepository.save(customerDB);
    const response = await request(app.getHttpServer())
        .get('/customer/'+ customer.id)
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200)

        expect(response.body.identification).toBe(customer.identification);
        expect(response.body.name).toBe(customer.name);
  }, timeout);

  it('/customer (POST)', async () => {
    const customerDTO = new CustomerDTO();
    customerDTO.identification = "1053847610";
    customerDTO.name = "Test Name";
    customerDTO.email = "CUSTOMER1@GMAIL.COM";
    customerDTO.password = "12345";
    const response = await request(app.getHttpServer())
        .post("/customer")
        .set('Authorization', `Bearer ${accessToken}`)
        .send(customerDTO)
        .expect(201)

        expect(response.body.identification).toBe(customerDTO.identification);
        expect(response.body.name).toBe(customerDTO.name);
  }, timeout);

  it('/customer (UPDATE)', async () => {
    const customer = await customerRepository.save(customerDB);
    const customerDTO = new CustomerDTO();
    customerDTO.identification = "1053847611";
    customerDTO.name = "Test Name 2";
    customerDTO.email = "CUSTOMER2@GMAIL.COM";
    customerDTO.password = "12345";
    const response = await request(app.getHttpServer())
        .put("/customer/" + customer.id)
        .set('Authorization', `Bearer ${accessToken}`)
        .send(customerDTO)
        .expect(200)

        expect(response.body.identification).toBe(customerDTO.identification);
        expect(response.body.name).toBe(customerDTO.name);
  }, timeout);

  it('/customer (DELETE)', async () => {
    const customer = await customerRepository.save(customerDB);
    await request(app.getHttpServer())
        .delete("/customer/" + customer.id)
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200)
  }, timeout);
});