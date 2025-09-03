import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../app.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthEntity } from '../auth/infrastructure/entity/auth-entity';
import { ReservationDTO } from '../reservation/adapter/dto/reservation-create-dto';
import { Role } from '../common/role';
import { ReservationEntity } from '../reservation/infrastructure/entity/reservation-entity';
import { CustomerEntity } from '../customer/infrastructure/entity/customer-entity';
import { FlightEntity } from '../flight/infrastructure/entity/flight-entity';
import { HotelEntity } from '../hotel/infrastructure/entity/hotel-entity';
import { ReservationResponseDTO } from '../reservation/adapter/dto/reservation-response-dto';
import { plainToInstance } from 'class-transformer';
import { AuthDTO } from 'src/auth/adapter/dto/auth-dto';

describe('ReservationController', () => {
  let app: INestApplication;
  const timeout = 90000;
  let reservationRepository: Repository<ReservationEntity>;
  let flightRepository: Repository<FlightEntity>;
  let hotelRepository: Repository<HotelEntity>;
  let customerRepository: Repository<CustomerEntity>;
  let authRepository: Repository<AuthEntity>;
  let accessToken = null;
  let flightDB: FlightEntity;
  let hotelDB: HotelEntity;
  let customerDB: CustomerEntity;
  let reservation: ReservationResponseDTO;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
        imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
        reservationRepository = moduleFixture.get<Repository<ReservationEntity>>(getRepositoryToken(ReservationEntity));
        flightRepository = moduleFixture.get<Repository<FlightEntity>>(getRepositoryToken(FlightEntity));
        hotelRepository = moduleFixture.get<Repository<HotelEntity>>(getRepositoryToken(HotelEntity));
        customerRepository = moduleFixture.get<Repository<CustomerEntity>>(getRepositoryToken(CustomerEntity));
        authRepository = moduleFixture.get<Repository<AuthEntity>>(getRepositoryToken(AuthEntity));

        const authDTO = new AuthDTO();
        authDTO.email = "ADMIN4@GMAIL.COM";
        authDTO.password = "12345";
        await request(app.getHttpServer())
            .post('/auth/register')
            .send(authDTO)
            .expect(201)
        
        authDTO.email = "ADMIN4@GMAIL.COM";
        authDTO.password = "12345";
        const responseLogin = await request(app.getHttpServer())
            .post('/auth/login')
            .send(authDTO)
            .expect(200)
        accessToken = responseLogin.body.token;

        flightDB = new FlightEntity();
        flightDB.airline = "Test Airline";
        flightDB.origin = "Test Origin";
        flightDB.destiny = "Test Destiny";
        flightDB.departure = new Date();
        flightDB.layovers = true;
        flightDB.price = 25000

        hotelDB = new HotelEntity();
        hotelDB.name = "Test Name";
        hotelDB.country = "Test Country";
        hotelDB.city = "Test City";
        hotelDB.category = "5";
        hotelDB.pricePerNight = 35000

        customerDB = new CustomerEntity();
        customerDB.identification = "1053847612";
        customerDB.name = "Test Name";
        customerDB.authEntity = new AuthEntity();
        customerDB.authEntity.email = "CUSTOMER2@GMAIL.COM";
        customerDB.authEntity.password = "12345";
        customerDB.authEntity.role = Role.CUSTOMER;

        flightDB = await flightRepository.save(flightDB);
        hotelDB = await hotelRepository.save(hotelDB);
        customerDB = await customerRepository.save(customerDB);
    }, timeout);

    afterAll(async () => {
      await reservationRepository.delete({id: reservation.id});
      await flightRepository.delete({id: flightDB.id});
      await hotelRepository.delete({id: hotelDB.id});
      await customerRepository.delete({id: customerDB.id});
      await authRepository.delete({email: "CUSTOMER2@GMAIL.COM"});
      await authRepository.delete({email: "ADMIN4@GMAIL.COM"});
      await app.close();
        
    }, timeout);

  it('/reservation (POST)', async () => {
    const reservationDTO = new ReservationDTO();
    reservationDTO.customerId = customerDB.id!;
    reservationDTO.flightId = flightDB.id!;
    reservationDTO.hotelId = hotelDB.id!;
    reservationDTO.numberNights = 10;
    const response = await request(app.getHttpServer())
        .post("/reservation")
        .set('Authorization', `Bearer ${accessToken}`)
        .send(reservationDTO)
        .expect(201);
    reservation = plainToInstance(ReservationResponseDTO, response.body, { excludeExtraneousValues: true });
    expect(reservation.id).toBeDefined();
    expect(reservation.numberNights).toBe(reservationDTO.numberNights);
  }, timeout);

  it('/reservation (POST CUSTOMER NOT FOUND)', async () => {
    const reservationDTO = new ReservationDTO();
    reservationDTO.customerId = "6c1c4700-f515-4924-bfb3-02823bfd45e1";
    reservationDTO.flightId = flightDB.id!;
    reservationDTO.hotelId = hotelDB.id!;
    reservationDTO.numberNights = 10;
    const response = await request(app.getHttpServer())
        .post("/reservation")
        .set('Authorization', `Bearer ${accessToken}`)
        .send(reservationDTO)
        .expect(404);
  }, timeout);

  it('/reservation (POST FLIGHT NOT FOUND)', async () => {
    const reservationDTO = new ReservationDTO();
    reservationDTO.customerId = customerDB.id!;
    reservationDTO.flightId = "6c1c4700-f515-4924-bfb3-02823bfd45e1";
    reservationDTO.hotelId = hotelDB.id!;
    reservationDTO.numberNights = 10;
    const response = await request(app.getHttpServer())
        .post("/reservation")
        .set('Authorization', `Bearer ${accessToken}`)
        .send(reservationDTO)
        .expect(404);
  }, timeout);

  it('/reservation (POST HOTEL NOT FOUND)', async () => {
    const reservationDTO = new ReservationDTO();
    reservationDTO.customerId = customerDB.id!;
    reservationDTO.flightId = flightDB.id!;
    reservationDTO.hotelId = "6c1c4700-f515-4924-bfb3-02823bfd45e1";
    reservationDTO.numberNights = 10;
    const response = await request(app.getHttpServer())
        .post("/reservation")
        .set('Authorization', `Bearer ${accessToken}`)
        .send(reservationDTO)
        .expect(404);
  }, timeout);

  it('/reservation (GET)', async () => {
    const response = await request(app.getHttpServer())
        .get('/reservation')
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200)
    
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
    expect(response.body[0].id).toBeDefined();
    expect(response.body[0].status).toBeDefined();
    expect(response.body[0].total).toBeDefined();
  }, timeout);

  it('/reservation/:id (GET)', async () => {
    const response = await request(app.getHttpServer())
        .get('/reservation/'+ reservation.id)
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200)

        expect(response.body.id).toBeDefined();
        expect(response.body.status).toBe(reservation.status);
        expect(response.body.total).toBe(reservation.total);
  }, timeout);

  it('/reservation/:id (NOT FOUND)', async () => {
    await request(app.getHttpServer())
        .get('/reservation/'+ "6c1c4700-f515-4924-bfb3-02823bfd45e1")
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(404)
  }, timeout);

  it('/reservation/:id (GET)', async () => {
    const response = await request(app.getHttpServer())
        .get('/reservation/'+ reservation.id)
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200)

        expect(response.body.id).toBeDefined();
        expect(response.body.status).toBe(reservation.status);
        expect(response.body.total).toBe(reservation.total);
  }, timeout);

  it('/reservation/confirm/:id (GET)', async () => {
    await request(app.getHttpServer())
        .get('/reservation/confirm/'+ reservation.id)
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200)
  }, timeout);

  it('/reservation/confirm/:id (NOT FOUND)', async () => {
    await request(app.getHttpServer())
        .get('/reservation/confirm/'+ "6c1c4700-f515-4924-bfb3-02823bfd45e1")
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(404)
  }, timeout);

  it('/reservation/cancel/:id (GET)', async () => {
    await request(app.getHttpServer())
        .get('/reservation/cancel/'+ reservation.id)
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(409)
  }, timeout);

  it('/reservation/cancel/:id (NOT FOUND)', async () => {
    await request(app.getHttpServer())
        .get('/reservation/cancel/'+ "6c1c4700-f515-4924-bfb3-02823bfd45e1")
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(404)
  }, timeout);

  it('/reservation (UPDATE)', async () => {
    const reservationDTO = new ReservationDTO();
    reservationDTO.customerId = customerDB.id!;
    reservationDTO.flightId = flightDB.id!;
    reservationDTO.hotelId = hotelDB.id!;
    reservationDTO.numberNights = 1;
    const response = await request(app.getHttpServer())
        .put("/reservation/" + reservation.id)
        .set('Authorization', `Bearer ${accessToken}`)
        .send(reservationDTO)
        .expect(200)

        expect(response.body.id).toBeDefined();
        expect(response.body.flight.id).toBe(reservationDTO.flightId);
        expect(response.body.hotel.id).toBe(reservationDTO.hotelId);
        expect(response.body.numberNights).toBe(reservationDTO.numberNights);
  }, timeout);

  it('/reservation (UPDATE NOT FOUND)', async () => {
    const reservationDTO = new ReservationDTO();
    reservationDTO.customerId = customerDB.id!;
    reservationDTO.flightId = flightDB.id!;
    reservationDTO.hotelId = hotelDB.id!;
    reservationDTO.numberNights = 1;
    const response = await request(app.getHttpServer())
        .put("/reservation/" + "6c1c4700-f515-4924-bfb3-02823bfd45e1")
        .set('Authorization', `Bearer ${accessToken}`)
        .send(reservationDTO)
        .expect(404)
  }, timeout);

  it('/reservation (DELETE)', async () => {
    await request(app.getHttpServer())
        .delete("/reservation/" + reservation.id)
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200)
  }, timeout);

  it('/reservation (DELETE NOT FOUND)', async () => {
      await request(app.getHttpServer())
          .delete("/reservation/" + "6c1c4700-f515-4924-bfb3-02823bfd45e1")
          .set('Authorization', `Bearer ${accessToken}`)
          .expect(404)
    }, timeout);
});