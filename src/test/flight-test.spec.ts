import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../app.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Flight } from '../flight/infrastructure/model/flight-entity';
import { RegisterDTO } from '../auth/adapter/dto/register-dto';
import { LoginDTO } from '../auth/adapter/dto/login-dto';
import { Auth } from '../auth/entity/auth.entity';
import { FlightDTO } from '../flight/adapter/dto/fligth-dto';
import { FlightResponseDTO } from '../flight/adapter/dto/fligth-response-dto';
import { plainToInstance } from 'class-transformer';

describe('FlightController', () => {
  let app: INestApplication;
  const timeout = 90000;
  let flightRepository: Repository<Flight>;
  let authRepository: Repository<Auth>;
  let accessToken = null;
  let flight: FlightResponseDTO;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
        imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
        flightRepository = moduleFixture.get<Repository<Flight>>(getRepositoryToken(Flight));
        authRepository = moduleFixture.get<Repository<Auth>>(getRepositoryToken(Auth));

        const registerDTO = new RegisterDTO();
        registerDTO.email = "ADMIN2@GMAIL.COM";
        registerDTO.password = "12345";
        await request(app.getHttpServer())
            .post('/auth/register')
            .send(registerDTO)
            .expect(201)
        

        const loginDTO = new LoginDTO();
        loginDTO.email = "ADMIN2@GMAIL.COM";
        loginDTO.password = "12345";
        const responseLogin = await request(app.getHttpServer())
            .post('/auth/login')
            .send(loginDTO)
            .expect(200)
        accessToken = responseLogin.body.token;

    }, timeout);


    afterAll(async () => {
      await flightRepository.delete({id: flight.id});
      await authRepository.delete({email: "ADMIN2@GMAIL.COM"})
      await app.close();
        
    }, timeout);

  it('/flight (POST)', async () => {
    const flightDTO = new FlightDTO();
    flightDTO.airline = "Test Airline";
    flightDTO.origin = "Test Origin";
    flightDTO.destiny = "Test Destiny";
    flightDTO.departure = new Date();
    flightDTO.layovers = true;
    flightDTO.price = 25000;
    const response = await request(app.getHttpServer())
        .post("/flight")
        .set('Authorization', `Bearer ${accessToken}`)
        .send(flightDTO)
        .expect(201)
    flight = plainToInstance(FlightResponseDTO, response.body, { excludeExtraneousValues: true });
    expect(flight.id).toBeDefined();
    expect(flight.airline).toBe(flightDTO.airline);
    expect(flight.origin).toBe(flightDTO.origin);
    expect(flight.destiny).toBe(flightDTO.destiny);
    expect(flight.layovers).toBe(flightDTO.layovers);
    expect(flight.price).toBe(flightDTO.price);
  }, timeout);

  it('/flight (GET)', async () => {
    const response = await request(app.getHttpServer())
        .get('/flight')
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200)
  
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);

    expect(response.body[0].id).toBeDefined();
    expect(response.body[0].airline).toBeDefined();
    expect(response.body[0].origin).toBeDefined();
    expect(response.body[0].destiny).toBeDefined();
    expect(response.body[0].layovers).toBeDefined();
    expect(response.body[0].price).toBeDefined();
  }, timeout);

  it('/flight/:id (GET)', async () => {
    const response = await request(app.getHttpServer())
        .get('/flight/'+ flight.id)
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200)

        expect(response.body.id).toBeDefined();
        expect(response.body.airline).toBe(flight.airline);
        expect(response.body.origin).toBe(flight.origin);
        expect(response.body.destiny).toBe(flight.destiny);
        expect(response.body.layovers).toBe(flight.layovers);
        expect(response.body.price).toBe(flight.price);
  }, timeout);

  it('/flight/:id (NOT FOUND)', async () => {
    const response = await request(app.getHttpServer())
        .get('/flight/'+ "6c1c4700-f515-4924-bfb3-02823bfd45e1")
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(404)
  }, timeout);

  it('/flight/origin/:origin/destiny/:destiny (GET)', async () => {
    const response = await request(app.getHttpServer())
        .get('/flight/origin/'+ flight.origin + "/destiny/" + flight.destiny)
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200)

        expect(response.body[0].id).toBeDefined();
        expect(response.body[0].airline).toBeDefined();
        expect(response.body[0].origin).toBeDefined();
        expect(response.body[0].destiny).toBeDefined();
        expect(response.body[0].layovers).toBeDefined();
        expect(response.body[0].price).toBeDefined();
  }, timeout);

  it('/flight (UPDATE)', async () => {
    const flightDTO = new FlightDTO();
    flightDTO.airline = "Test Airline 2";
    flightDTO.origin = "Test Origin 2";
    flightDTO.destiny = "Test Destiny 2";
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

  it('/flight (UPDATE NOT FOUND)', async () => {
    const flightDTO = new FlightDTO();
    flightDTO.airline = "Test Airline 2";
    flightDTO.origin = "Test Origin 2";
    flightDTO.destiny = "Test Destiny 2";
    flightDTO.departure = new Date();
    flightDTO.layovers = false;
    flightDTO.price = 45000;
    const response = await request(app.getHttpServer())
        .put("/flight/" + "6c1c4700-f515-4924-bfb3-02823bfd45e1")
        .set('Authorization', `Bearer ${accessToken}`)
        .send(flightDTO)
        .expect(404)
  }, timeout);

  it('/flight (DELETE)', async () => {
    await request(app.getHttpServer())
        .delete("/flight/" + flight.id)
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200)
  }, timeout);

  it('/flight (DELETE)', async () => {
    await request(app.getHttpServer())
        .delete("/flight/" + "6c1c4700-f515-4924-bfb3-02823bfd45e1")
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(404)
  }, timeout);
});