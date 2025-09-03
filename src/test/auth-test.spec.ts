import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../app.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthEntity } from '../auth/infrastructure/entity/auth-entity';
import { plainToInstance } from 'class-transformer';
import { AuthDTO } from '../auth/application/dto/auth-dto';
import { AuthResponseDTO } from '../auth/application/dto/auth-response-dto';
import { TokenResponseDTO } from 'src/auth/application/dto/token-response-dto';

describe('AuthController', () => {
  let app: INestApplication;
  const timeout = 90000;
  let authRepository: Repository<AuthEntity>;
  let accessToken = null;
  let tokenResponseDTO: TokenResponseDTO;
  let authResponseDTO: AuthResponseDTO;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
        imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
        authRepository = moduleFixture.get<Repository<AuthEntity>>(getRepositoryToken(AuthEntity));
    }, timeout);


    afterAll(async () => {
      await authRepository.delete({email: "ADMIN5@GMAIL.COM"})
      await app.close();
        
    }, timeout);

  it('/auth/register (POST)', async () => {
    const authDTO = new AuthDTO();
    authDTO.email = "ADMIN5@GMAIL.COM";
    authDTO.password = "12345"
    const response = await request(app.getHttpServer())
        .post("/auth/register")
        .set('Authorization', `Bearer ${accessToken}`)
        .send(authDTO)
        .expect(201)
    authResponseDTO = plainToInstance(AuthResponseDTO, response.body, { excludeExtraneousValues: true });
    expect(authResponseDTO.email).toBe(authDTO.email);
  }, timeout);

  it('/auth/login (POST)', async () => {
    const authDTO = new AuthDTO();
    authDTO.email = "ADMIN5@GMAIL.COM";
    authDTO.password = "12345"
    const response = await request(app.getHttpServer())
        .post("/auth/login")
        .set('Authorization', `Bearer ${accessToken}`)
        .send(authDTO)
        .expect(200)
  }, timeout);

  it('/auth/login (EMAIL NOT FOUND)', async () => {
    const authDTO = new AuthDTO();
    authDTO.email = "ADMIN0@GMAIL.COM";
    authDTO.password = "12345"
    await request(app.getHttpServer())
        .post("/auth/login")
        .set('Authorization', `Bearer ${accessToken}`)
        .send(authDTO)
        .expect(404)
  }, timeout);

  it('/auth/login (PASSWORD NOT FOUND)', async () => {
    const authDTO = new AuthDTO();
    authDTO.email = "ADMIN5@GMAIL.COM";
    authDTO.password = "123456"
    const response = await request(app.getHttpServer())
        .post("/auth/login")
        .set('Authorization', `Bearer ${accessToken}`)
        .send(authDTO)
        .expect(401)
  }, timeout);
});