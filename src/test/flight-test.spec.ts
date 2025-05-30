import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../app.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Flight } from '../flight/entity/flight.entity';
import { RegisterDTO } from '../auth/dto/register.dto';
import { LoginDTO } from '../auth/dto/login.dto';
import { Auth } from '../auth/entity/auth.entity';
import { FlightDTO } from '../flight/dto/fligth.dto';

describe('FlightController', () => {
  let app: INestApplication;
  const timeout = 90000;
  let flightRepository: Repository<Flight>;
  let authRepository: Repository<Auth>;
  let accessToken = null;
  let flightDB: Flight;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
        imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
        flightRepository = moduleFixture.get<Repository<Flight>>(getRepositoryToken(Flight));
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

        flightDB = new Flight();
        flightDB.airline = "Test Airline";
        flightDB.origin = "Test Origin";
        flightDB.destiny = "Test Destiny";
        flightDB.departure = new Date();
        flightDB.layovers = true;
        flightDB.price = 15000;
        flightDB = await flightRepository.save(flightDB)

    }, timeout);


    afterAll(async () => {
      await flightRepository.delete({});
      await authRepository.delete({})
      await app.close();
        
    }, timeout);

  it('/flight (GET)', async () => {
    const response = await request(app.getHttpServer())
        .get('/flight')
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200)

        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBeGreaterThan(0);

        expect(response.body[0].id).toBeDefined();
        expect(response.body[0].airline).toBe(flightDB.airline);
        expect(response.body[0].origin).toBe(flightDB.origin);
        expect(response.body[0].destiny).toBe(flightDB.destiny);
        expect(response.body[0].layovers).toBe(flightDB.layovers);
        expect(response.body[0].price).toBe(flightDB.price);
  }, timeout);

  it('/flight/:id (GET)', async () => {
    const response = await request(app.getHttpServer())
        .get('/flight/'+ flightDB.id)
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200)

        expect(response.body.id).toBeDefined();
        expect(response.body.airline).toBe(flightDB.airline);
        expect(response.body.origin).toBe(flightDB.origin);
        expect(response.body.destiny).toBe(flightDB.destiny);
        expect(response.body.layovers).toBe(flightDB.layovers);
        expect(response.body.price).toBe(flightDB.price);
  }, timeout);

  it('/flight (POST)', async () => {
    const flightDTO = new FlightDTO();
    flightDTO.airline = "Test Airline 2";
    flightDTO.origin = "Test Origin 2";
    flightDTO.destiny = "Test Destiny 2";
    flightDTO.departure = new Date();
    flightDTO.layovers = true;
    flightDTO.price = 25000;
    const response = await request(app.getHttpServer())
        .post("/flight")
        .set('Authorization', `Bearer ${accessToken}`)
        .send(flightDTO)
        .expect(201)

        expect(response.body.id).toBeDefined();
        expect(response.body.airline).toBe(flightDTO.airline);
        expect(response.body.origin).toBe(flightDTO.origin);
        expect(response.body.destiny).toBe(flightDTO.destiny);
        expect(response.body.layovers).toBe(flightDTO.layovers);
        expect(response.body.price).toBe(flightDTO.price);
  }, timeout);

  it('/flight (UPDATE)', async () => {
    const flight = await flightRepository.save(flightDB);
    const flightDTO = new FlightDTO();
    flightDTO.airline = "Test Airline 3";
    flightDTO.origin = "Test Origin 3";
    flightDTO.destiny = "Test Destiny 3";
    flightDTO.departure = new Date();
    flightDTO.layovers = false;
    flightDTO.price = 45000;
    const response = await request(app.getHttpServer())
        .put("/flight/" + flight.id)
        .set('Authorization', `Bearer ${accessToken}`)
        .send(flightDTO)
        .expect(200)

        expect(response.body.id).toBeDefined();
        expect(response.body.airline).toBe(flightDTO.airline);
        expect(response.body.origin).toBe(flightDTO.origin);
        expect(response.body.destiny).toBe(flightDTO.destiny);
        expect(response.body.layovers).toBe(flightDTO.layovers);
        expect(response.body.price).toBe(flightDTO.price);
  }, timeout);

  it('/flight (DELETE)', async () => {
    await request(app.getHttpServer())
        .delete("/flight/" + flightDB.id)
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200)
  }, timeout);
});