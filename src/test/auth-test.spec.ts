import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../app.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegisterDTO } from '../auth/adapter/dto/register.dto';
import { LoginDTO } from '../auth/adapter/dto/login.dto';
import { Auth } from '../auth/entity/auth.entity';
import { plainToInstance } from 'class-transformer';
import { AuthResponseDTO } from '../auth/adapter/dto/auth-response.dto';
import { RegisterResponseDTO } from '../auth/adapter/dto/register-response.dto';
import { LoginResponseDTO } from '../auth/dto/login-response.dto';

describe('AuthController', () => {
  let app: INestApplication;
  const timeout = 90000;
  let authRepository: Repository<Auth>;
  let accessToken = null;
  let registerResponseDTO: RegisterResponseDTO;
  let loginResponseDTO: LoginResponseDTO;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
        imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
        authRepository = moduleFixture.get<Repository<Auth>>(getRepositoryToken(Auth));
    }, timeout);


    afterAll(async () => {
      await authRepository.delete({email: "ADMIN5@GMAIL.COM"})
      await app.close();
        
    }, timeout);

  it('/auth/register (POST)', async () => {
    const registerDTO = new RegisterDTO();
    registerDTO.email = "ADMIN5@GMAIL.COM";
    registerDTO.password = "12345"
    const response = await request(app.getHttpServer())
        .post("/auth/register")
        .set('Authorization', `Bearer ${accessToken}`)
        .send(registerDTO)
        .expect(201)
    registerResponseDTO = plainToInstance(RegisterResponseDTO, response.body, { excludeExtraneousValues: true });
    expect(registerResponseDTO.email).toBe(registerDTO.email);
  }, timeout);

  it('/auth/login (POST)', async () => {
    const loginDTO = new LoginDTO();
    loginDTO.email = "ADMIN5@GMAIL.COM";
    loginDTO.password = "12345"
    const response = await request(app.getHttpServer())
        .post("/auth/login")
        .set('Authorization', `Bearer ${accessToken}`)
        .send(loginDTO)
        .expect(200)
    loginResponseDTO = plainToInstance(LoginResponseDTO, response.body, { excludeExtraneousValues: true });
    expect(registerResponseDTO.email).toBe(loginDTO.email);
  }, timeout);

  it('/auth/login (EMAIL NOT FOUND)', async () => {
    const loginDTO = new LoginDTO();
    loginDTO.email = "ADMIN0@GMAIL.COM";
    loginDTO.password = "12345"
    const response = await request(app.getHttpServer())
        .post("/auth/login")
        .set('Authorization', `Bearer ${accessToken}`)
        .send(loginDTO)
        .expect(404)
  }, timeout);

  it('/auth/login (PASSWORD NOT FOUND)', async () => {
    const loginDTO = new LoginDTO();
    loginDTO.email = "ADMIN5@GMAIL.COM";
    loginDTO.password = "123456"
    const response = await request(app.getHttpServer())
        .post("/auth/login")
        .set('Authorization', `Bearer ${accessToken}`)
        .send(loginDTO)
        .expect(401)
  }, timeout);
});