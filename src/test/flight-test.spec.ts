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

    });

    beforeEach(async () => {
        flightDB = new Flight();
        flightDB.airline = "Test Airline";
        flightDB.origin = "Test Origin";
        flightDB.destiny = "Test Destiny";
        flightDB.departure = new Date();
        flightDB.layovers = true;
    })

    afterEach(async () => {
        await flightRepository.delete({});
    })

    afterAll(async () => {
        await authRepository.delete({})
        await app.close();
        
    });

  it('/flight (GET)', async () => {
    const flight = await flightRepository.save(flightDB)
    const response = await request(app.getHttpServer())
        .get('/flight')
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200)

        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBeGreaterThan(0);

        expect(response.body[0].id).toBeDefined();
        expect(response.body[0].airline).toBe(flight.airline);
        expect(response.body[0].origin).toBe(flight.origin);
        expect(response.body[0].destiny).toBe(flight.destiny);
        expect(response.body[0].layovers).toBe(flight.layovers);
  });

  it('/flight/:id (GET)', async () => {
    const flight = await flightRepository.save(flightDB);
    const response = await request(app.getHttpServer())
        .get('/flight/'+ flight.id)
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200)

        expect(response.body.id).toBeDefined();
        expect(response.body.airline).toBe(flight.airline);
        expect(response.body.origin).toBe(flight.origin);
        expect(response.body.destiny).toBe(flight.destiny);
        expect(response.body.layovers).toBe(flight.layovers);
  });

  it('/flight (POST)', async () => {
    const flightDTO = new FlightDTO();
    flightDTO.airline = "Test Airline";
    flightDTO.origin = "Test Origin";
    flightDTO.destiny = "Test Destiny";
    flightDTO.departure = new Date();
    flightDTO.layovers = true;
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
  });

  it('/flight (UPDATE)', async () => {
    const flight = await flightRepository.save(flightDB);
    const flightDTO = new FlightDTO();
    flightDTO.airline = "Test Airline 2";
    flightDTO.origin = "Test Origin 2";
    flightDTO.destiny = "Test Destiny 2";
    flightDTO.departure = new Date();
    flightDTO.layovers = false;
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
  });

  it('/flight (DELETE)', async () => {
    const flight = await flightRepository.save(flightDB);
    await request(app.getHttpServer())
        .delete("/flight/" + flight.id)
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200)
  });
});