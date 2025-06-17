import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../app.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Hotel } from '../hotel/infrastructure/entity/hotel-entity';
import { RegisterDTO } from '../auth/adapter/dto/register-dto';
import { LoginDTO } from '../auth/adapter/dto/login-dto';
import { Auth } from '../auth/entity/auth.entity';
import { HotelDTO } from '../hotel/adapter/dto/hotel.dto';
import { HotelResponseDTO } from '../hotel/adapter/dto/hotel-response.dto';
import { plainToInstance } from 'class-transformer';

describe('HotelController', () => {
  let app: INestApplication;
  let timeout = 90000;
  let hotelRepository: Repository<Hotel>;
  let authRepository: Repository<Auth>;
  let accessToken = null;
  let hotel: HotelResponseDTO;

  beforeAll(async () => {
      const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      }).compile();

      app = moduleFixture.createNestApplication();
      await app.init();
      hotelRepository = moduleFixture.get<Repository<Hotel>>(getRepositoryToken(Hotel));
      authRepository = moduleFixture.get<Repository<Auth>>(getRepositoryToken(Auth));

      const registerDTO = new RegisterDTO();
      registerDTO.email = "ADMIN3@GMAIL.COM";
      registerDTO.password = "12345";
      await request(app.getHttpServer())
          .post('/auth/register')
          .send(registerDTO)
          .expect(201)
      

      const loginDTO = new LoginDTO();
      loginDTO.email = "ADMIN3@GMAIL.COM";
      loginDTO.password = "12345";
      const responseLogin = await request(app.getHttpServer())
          .post('/auth/login')
          .send(loginDTO)
          .expect(200)
      accessToken = responseLogin.body.token;
  }, timeout);

  afterAll(async () => {
    await hotelRepository.delete({id: hotel.id});
    await authRepository.delete({email: "ADMIN3@GMAIL.COM"})
    await app.close();
      
  }, timeout);

  it('/hotel (POST)', async () => {
    const hotelDTO = new HotelDTO();
    hotelDTO.name = "Test Name";
    hotelDTO.country = "Test Country";
    hotelDTO.city = "Test City";
    hotelDTO.category = "3";
    hotelDTO.pricePerNight = 35000;
    const response = await request(app.getHttpServer())
        .post("/hotel")
        .set('Authorization', `Bearer ${accessToken}`)
        .send(hotelDTO)
        .expect(201)

    hotel = plainToInstance(HotelResponseDTO, response.body, { excludeExtraneousValues: true });
    expect(hotel.id).toBeDefined();
    expect(hotel.name).toBe(hotelDTO.name);
    expect(hotel.country).toBe(hotelDTO.country);
    expect(hotel.city).toBe(hotelDTO.city);
    expect(hotel.pricePerNight).toBe(hotelDTO.pricePerNight);
  }, timeout);

  it('/hotel (GET)', async () => {
    const response = await request(app.getHttpServer())
        .get('/hotel')
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200)

        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBeGreaterThan(0);

        expect(response.body[0].id).toBeDefined();
        expect(response.body[0].name).toBeDefined();
        expect(response.body[0].country).toBeDefined();
        expect(response.body[0].city).toBeDefined();
        expect(response.body[0].pricePerNight).toBeDefined();
  }, timeout);

  it('/hotel/:id (GET)', async () => {
    const response = await request(app.getHttpServer())
        .get('/hotel/'+ hotel.id)
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200)

        expect(response.body.id).toBeDefined();
        expect(response.body.name).toBe(hotel.name);
        expect(response.body.country).toBe(hotel.country);
        expect(response.body.city).toBe(hotel.city);
        expect(response.body.pricePerNight).toBe(hotel.pricePerNight);
  }, timeout);

  it('/hotel/:id (NOT FOUND)', async () => {
    const response = await request(app.getHttpServer())
        .get('/hotel/'+ "6c1c4700-f515-4924-bfb3-02823bfd45e1")
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(404)
  }, timeout);

  it('/hotel/country/:country/city/:city (GET)', async () => {
    const response = await request(app.getHttpServer())
        .get('/hotel/country/'+ hotel.country + "/city/" + hotel.city)
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200)

        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBeGreaterThan(0);

        expect(response.body[0].id).toBeDefined();
        expect(response.body[0].name).toBeDefined();
        expect(response.body[0].country).toBeDefined();
        expect(response.body[0].city).toBeDefined();
        expect(response.body[0].pricePerNight).toBeDefined();
  }, timeout);

  it('/hotel (UPDATE)', async () => {
    const hotelDTO = new HotelDTO();
    hotelDTO.name = "Test Name 2";
    hotelDTO.country = "Test Country 2";
    hotelDTO.city = "Test City 2";
    hotelDTO.category = "1";
    hotelDTO.pricePerNight = 45000;
    const response = await request(app.getHttpServer())
        .put("/hotel/" + hotel.id)
        .set('Authorization', `Bearer ${accessToken}`)
        .send(hotelDTO)
        .expect(200)

        expect(response.body.id).toBeDefined();
        expect(response.body.name).toBe(hotelDTO.name);
        expect(response.body.country).toBe(hotelDTO.country);
        expect(response.body.city).toBe(hotelDTO.city);
        expect(response.body.pricePerNight).toBe(hotelDTO.pricePerNight);
  }, timeout);

  it('/hotel (UPDATE NOT FOUND)', async () => {
    const hotelDTO = new HotelDTO();
    hotelDTO.name = "Test Name 2";
    hotelDTO.country = "Test Country 2";
    hotelDTO.city = "Test City 2";
    hotelDTO.category = "1";
    hotelDTO.pricePerNight = 45000;
    const response = await request(app.getHttpServer())
        .put("/hotel/" + "6c1c4700-f515-4924-bfb3-02823bfd45e1")
        .set('Authorization', `Bearer ${accessToken}`)
        .send(hotelDTO)
        .expect(404)
  }, timeout);

  it('/hotel (DELETE)', async () => {
    await request(app.getHttpServer())
        .delete("/hotel/" + hotel.id)
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200)
  }, timeout);

  it('/hotel (DELETE NOT FOUND)', async () => {
    await request(app.getHttpServer())
        .delete("/hotel/" + "6c1c4700-f515-4924-bfb3-02823bfd45e1")
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(404)
  }, timeout);
});