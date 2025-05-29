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

    });

    beforeEach(async () => {
        hotelDB = new Hotel();
        hotelDB.name = "Test Name";
        hotelDB.country = "Test Country";
        hotelDB.city = "Test City";
        hotelDB.category = "5";
        hotelDB.pricePerNight = 35000
    })

    afterEach(async () => {
        await hotelRepository.delete({});
    })

    afterAll(async () => {
        await authRepository.delete({})
        await app.close();
        
    });

  it('/hotel (GET)', async () => {
    const hotel = await hotelRepository.save(hotelDB)
    const response = await request(app.getHttpServer())
        .get('/hotel')
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200)

        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBeGreaterThan(0);

        expect(response.body[0].id).toBeDefined();
        expect(response.body[0].name).toBe(hotel.name);
        expect(response.body[0].country).toBe(hotel.country);
        expect(response.body[0].city).toBe(hotel.city);
        expect(response.body[0].pricePerNight).toBe(hotel.pricePerNight);
  });

  it('/hotel/:id (GET)', async () => {
    const hotel = await hotelRepository.save(hotelDB);
    const response = await request(app.getHttpServer())
        .get('/hotel/'+ hotel.id)
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200)

        expect(response.body.id).toBeDefined();
        expect(response.body.name).toBe(hotel.name);
        expect(response.body.country).toBe(hotel.country);
        expect(response.body.city).toBe(hotel.city);
        expect(response.body.pricePerNight).toBe(hotel.pricePerNight);
  });

  it('/hotel/country/:country/city/:city (GET)', async () => {
    const hotel = await hotelRepository.save(hotelDB);
    const response = await request(app.getHttpServer())
        .get('/hotel/country/'+ hotel.country + "/city/" + hotel.city)
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200)

        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBeGreaterThan(0);

        expect(response.body[0].id).toBeDefined();
        expect(response.body[0].name).toBe(hotel.name);
        expect(response.body[0].country).toBe(hotel.country);
        expect(response.body[0].city).toBe(hotel.city);
        expect(response.body[0].pricePerNight).toBe(hotel.pricePerNight);
  });

  it('/hotel (POST)', async () => {
    const hotelDTO = new HotelDTO();
    hotelDTO.name = "Test Name";
    hotelDTO.country = "Test Country";
    hotelDTO.city = "Test City";
    hotelDTO.category = "5";
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
  });

  it('/hotel (UPDATE)', async () => {
    const hotel = await hotelRepository.save(hotelDB);
    const hotelDTO = new HotelDTO();
    hotelDTO.name = "Test Name 2";
    hotelDTO.country = "Test Country 2";
    hotelDTO.city = "Test City 2";
    hotelDTO.category = "10";
    hotelDTO.pricePerNight = 15000;
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
  });

  it('/hotel (DELETE)', async () => {
    const hotel = await hotelRepository.save(hotelDB);
    await request(app.getHttpServer())
        .delete("/hotel/" + hotel.id)
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200)
  });
});