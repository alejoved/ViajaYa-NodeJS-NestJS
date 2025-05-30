import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../app.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegisterDTO } from '../auth/dto/register.dto';
import { LoginDTO } from '../auth/dto/login.dto';
import { Auth } from '../auth/entity/auth.entity';
import { ReservationDTO } from '../reservation/dto/reservation.dto';
import { Role } from '../common/role';
import { Reservation } from '../reservation/entity/reservation.entity';
import { Customer } from '../customer/entity/customer.entity';
import { Flight } from '../flight/entity/flight.entity';
import { Hotel } from '../hotel/entity/hotel.entity';
import { ReservationResponseDTO } from '../reservation/dto/reservation-response.dto';
import { plainToInstance } from 'class-transformer';

describe('ReservationController', () => {
  let app: INestApplication;
  const timeout = 90000;
  let reservationRepository: Repository<Reservation>;
  let flightRepository: Repository<Flight>;
  let hotelRepository: Repository<Hotel>;
  let customerRepository: Repository<Customer>;
  let authRepository: Repository<Auth>;
  let accessToken = null;
  let flightDB: Flight;
  let hotelDB: Hotel;
  let customerDB: Customer;
  let reservation: ReservationResponseDTO;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
        imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
        reservationRepository = moduleFixture.get<Repository<Reservation>>(getRepositoryToken(Reservation));
        flightRepository = moduleFixture.get<Repository<Flight>>(getRepositoryToken(Flight));
        hotelRepository = moduleFixture.get<Repository<Hotel>>(getRepositoryToken(Hotel));
        customerRepository = moduleFixture.get<Repository<Customer>>(getRepositoryToken(Customer));
        authRepository = moduleFixture.get<Repository<Auth>>(getRepositoryToken(Auth));

        const registerDTO = new RegisterDTO();
        registerDTO.email = "ADMIN4@GMAIL.COM";
        registerDTO.password = "12345";
        await request(app.getHttpServer())
            .post('/auth/register')
            .send(registerDTO)
            .expect(201)
        

        const loginDTO = new LoginDTO();
        loginDTO.email = "ADMIN4@GMAIL.COM";
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
        flightDB.price = 25000

        hotelDB = new Hotel();
        hotelDB.name = "Test Name";
        hotelDB.country = "Test Country";
        hotelDB.city = "Test City";
        hotelDB.category = "5";
        hotelDB.pricePerNight = 35000

        customerDB = new Customer();
        customerDB.identification = "1053847612";
        customerDB.name = "Test Name";
        customerDB.auth = new Auth();
        customerDB.auth.email = "CUSTOMER2@GMAIL.COM";
        customerDB.auth.password = "12345";
        customerDB.auth.role = Role.CUSTOMER;

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
    reservationDTO.customerEmail = "CUSTOMER2@GMAIL.COM";
    reservationDTO.flightId = flightDB.id;
    reservationDTO.hotelId = hotelDB.id;
    reservationDTO.numberNights = 10;
    const response = await request(app.getHttpServer())
        .post("/reservation")
        .set('Authorization', `Bearer ${accessToken}`)
        .send(reservationDTO)
        .expect(201);
    reservation = plainToInstance(ReservationResponseDTO, response.body, { excludeExtraneousValues: true });
    expect(reservation.id).toBeDefined();
    expect(reservation.flight.id).toBe(reservationDTO.flightId);
    expect(reservation.hotel.id).toBe(reservationDTO.hotelId);
    expect(reservation.numberNights).toBe(reservationDTO.numberNights);
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

  it('/reservation (UPDATE)', async () => {
    const reservationDTO = new ReservationDTO();
    reservationDTO.customerEmail = "CUSTOMER2@GMAIL.COM";
    reservationDTO.flightId = flightDB.id;
    reservationDTO.hotelId = hotelDB.id;
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

  it('/reservation (DELETE)', async () => {
    await request(app.getHttpServer())
        .delete("/reservation/" + reservation.id)
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200)
  }, timeout);
});