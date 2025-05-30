import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../app.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Hotel } from '../hotel/entity/hotel.entity';
import { RegisterDTO } from '../auth/dto/register.dto';
import { LoginDTO } from '../auth/dto/login.dto';
import { Auth } from '../auth/entity/auth.entity';
import { HotelDTO } from '../hotel/dto/hotel.dto';

describe('HotelController', () => {
  let app: INestApplication;
  let timeout = 90000;
  let hotelRepository: Repository<Hotel>;
  let authRepository: Repository<Auth>;
  let accessToken = null;
  let hotelDB: Hotel;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
        imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
        hotelRepository = moduleFixture.get<Repository<Hotel>>(getRepositoryToken(Hotel));
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

        hotelDB = new Hotel();
        hotelDB.name = "Test Name";
        hotelDB.country = "Test Country";
        hotelDB.city = "Test City";
        hotelDB.category = "5";
        hotelDB.pricePerNight = 35000;
        hotelDB = await hotelRepository.save(hotelDB);

    }, timeout);

    afterAll(async () => {
      await hotelRepository.delete({});
      await authRepository.delete({})
      await app.close();
        
    }, timeout);

  it('/hotel (GET)', async () => {
    const response = await request(app.getHttpServer())
        .get('/hotel')
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200)

        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBeGreaterThan(0);

        expect(response.body[0].id).toBeDefined();
        expect(response.body[0].name).toBe(hotelDB.name);
        expect(response.body[0].country).toBe(hotelDB.country);
        expect(response.body[0].city).toBe(hotelDB.city);
        expect(response.body[0].pricePerNight).toBe(hotelDB.pricePerNight);
  }, timeout);

  it('/hotel/:id (GET)', async () => {
    const response = await request(app.getHttpServer())
        .get('/hotel/'+ hotelDB.id)
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200)

        expect(response.body.id).toBeDefined();
        expect(response.body.name).toBe(hotelDB.name);
        expect(response.body.country).toBe(hotelDB.country);
        expect(response.body.city).toBe(hotelDB.city);
        expect(response.body.pricePerNight).toBe(hotelDB.pricePerNight);
  }, timeout);

  it('/hotel/country/:country/city/:city (GET)', async () => {
    const response = await request(app.getHttpServer())
        .get('/hotel/country/'+ hotelDB.country + "/city/" + hotelDB.city)
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200)

        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBeGreaterThan(0);

        expect(response.body[0].id).toBeDefined();
        expect(response.body[0].name).toBe(hotelDB.name);
        expect(response.body[0].country).toBe(hotelDB.country);
        expect(response.body[0].city).toBe(hotelDB.city);
        expect(response.body[0].pricePerNight).toBe(hotelDB.pricePerNight);
  }, timeout);

  it('/hotel (POST)', async () => {
    const hotelDTO = new HotelDTO();
    hotelDTO.name = "Test Name 2";
    hotelDTO.country = "Test Country 2";
    hotelDTO.city = "Test City 2";
    hotelDTO.category = "3";
    hotelDTO.pricePerNight = 35000;
    const response = await request(app.getHttpServer())
        .post("/hotel")
        .set('Authorization', `Bearer ${accessToken}`)
        .send(hotelDTO)
        .expect(201)

        expect(response.body.id).toBeDefined();
        expect(response.body.name).toBe(hotelDTO.name);
        expect(response.body.country).toBe(hotelDTO.country);
        expect(response.body.city).toBe(hotelDTO.city);
        expect(response.body.pricePerNight).toBe(hotelDTO.pricePerNight);
  }, timeout);

  it('/hotel (UPDATE)', async () => {
    const hotel = await hotelRepository.save(hotelDB);
    const hotelDTO = new HotelDTO();
    hotelDTO.name = "Test Name 3";
    hotelDTO.country = "Test Country 3";
    hotelDTO.city = "Test City 3";
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

  it('/hotel (DELETE)', async () => {
    await request(app.getHttpServer())
        .delete("/hotel/" + hotelDB.id)
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200)
  }, timeout);
});