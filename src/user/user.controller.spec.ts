import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../app.module';

describe('UserController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/user (POST)', () => {
    return request(app.getHttpServer())
      .post('/user')
      .send({ /* adicione aqui o objeto conforme o seu CreateUserDto */ })
      .expect(201); // ou outro código de status esperado
  });

  it('/user (GET)', () => {
    return request(app.getHttpServer())
      .get('/user')
      .expect(200)
      .expect('Content-Type', /json/); // ou verifique o tipo de conteúdo correto
  });

  it('/user/:id (GET)', () => {
    return request(app.getHttpServer())
      .get('/user/1')
      .expect(200)
      .expect('Content-Type', /json/); // ou verifique o tipo de conteúdo correto
  });

  it('/user/:id (PATCH)', () => {
    return request(app.getHttpServer())
      .patch('/user/1')
      .send({ /* adicione aqui o objeto conforme o seu UpdateUserDto */ })
      .expect(200);
  });

  it('/user/change-password (PATCH)', () => {
    return request(app.getHttpServer())
      .patch('/user/change-password')
      .send({ /* adicione aqui o objeto conforme o seu UpdatePasswordDto */ })
      .expect(200);
  });

  it('/user/:id (DELETE)', () => {
    return request(app.getHttpServer())
      .delete('/user/1')
      .expect(200);
  });
});
