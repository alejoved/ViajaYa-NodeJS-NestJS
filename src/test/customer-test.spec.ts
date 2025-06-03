import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../app.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from '../customer/entity/customer.entity';
import { LoginDTO } from '../auth/dto/login.dto';
import { Auth } from '../auth/entity/auth.entity';
import { CustomerDTO } from '../customer/dto/customer.dto';
import { RegisterDTO } from '../auth/dto/register.dto';
import { plainToInstance } from 'class-transformer';
import { CustomerResponseDTO } from '../customer/dto/customer-response.dto';

describe('CustomerController', () => {
  let app: INestApplication;
  const timeout = 90000
  let customerRepository: Repository<Customer>;
  let authRepository: Repository<Auth>;
  let accessToken = null;
  let customer: CustomerResponseDTO;

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

  }, timeout);

  afterAll(async () => {
    await customerRepository.delete({id: customer.id});
    await authRepository.delete({email: "ADMIN1@GMAIL.COM"})
    await authRepository.delete({email: "CUSTOMER1@GMAIL.COM"})
    await app.close();
      
  }, timeout);

  
  it('/customer (POST)', async () => {
    const customerDTO = new CustomerDTO();
    customerDTO.identification = "1053847611";
    customerDTO.name = "Test Name";
    customerDTO.email = "CUSTOMER1@GMAIL.COM";
    customerDTO.password = "12345";
    const response = await request(app.getHttpServer())
        .post("/customer")
        .set('Authorization', `Bearer ${accessToken}`)
        .send(customerDTO)
        .expect(201)
    customer = plainToInstance(CustomerResponseDTO, response.body, { excludeExtraneousValues: true });
    expect(response.body.identification).toBe(customerDTO.identification);
    expect(response.body.name).toBe(customerDTO.name);
  }, timeout);

  it('/customer (GET)', async () => {
    const response = await request(app.getHttpServer())
        .get('/customer')
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200)

        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBeGreaterThan(0);

        expect(response.body[0].identification).toBeDefined();
        expect(response.body[0].name).toBeDefined();
  }, timeout);

  it('/customer/:id (GET)', async () => {
    const response = await request(app.getHttpServer())
        .get('/customer/'+ customer.id)
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200)

        expect(response.body.identification).toBe(customer.identification);
        expect(response.body.name).toBe(customer.name);
  }, timeout);

  it('/customer/:id (NOT FOUND)', async () => {
    const response = await request(app.getHttpServer())
        .get('/customer/'+ "6c1c4700-f515-4924-bfb3-02823bfd45e1")
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(404)
  }, timeout);

  it('/customer/email/:email (GET)', async () => {
    const response = await request(app.getHttpServer())
        .get('/customer/email/'+ customer.auth.email)
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200)

        expect(response.body.identification).toBe(customer.identification);
        expect(response.body.name).toBe(customer.name);
  }, timeout);

  it('/customer/email/:email (NOT FOUND)', async () => {
    const response = await request(app.getHttpServer())
        .get('/customer/email/'+ "NONE@GMAIL.COM")
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(404)
  }, timeout);

  it('/customer (UPDATE)', async () => {
    const customerDTO = new CustomerDTO();
    customerDTO.identification = "1053847611";
    customerDTO.name = "Test Name 2";
    customerDTO.email = "CUSTOMER1@GMAIL.COM";
    customerDTO.password = "12345";
    const response = await request(app.getHttpServer())
        .put("/customer/" + customer.id)
        .set('Authorization', `Bearer ${accessToken}`)
        .send(customerDTO)
        .expect(200)

        expect(response.body.identification).toBe(customerDTO.identification);
        expect(response.body.name).toBe(customerDTO.name);
  }, timeout);

  it('/customer (UPDATE NOT FOUND)', async () => {
    const customerDTO = new CustomerDTO();
    customerDTO.identification = "1053847611";
    customerDTO.name = "Test Name 2";
    customerDTO.email = "CUSTOMER1@GMAIL.COM";
    customerDTO.password = "12345";
    const response = await request(app.getHttpServer())
        .put("/customer/" + "6c1c4700-f515-4924-bfb3-02823bfd45e1")
        .set('Authorization', `Bearer ${accessToken}`)
        .send(customerDTO)
        .expect(404)
  }, timeout);

  it('/customer (DELETE)', async () => {
    await request(app.getHttpServer())
        .delete("/customer/" + customer.id)
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200)
  }, timeout);

  it('/customer (DELETE NOT FOUND)', async () => {
    await request(app.getHttpServer())
        .delete("/customer/" + "6c1c4700-f515-4924-bfb3-02823bfd45e1")
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(404)
  }, timeout);
  
});