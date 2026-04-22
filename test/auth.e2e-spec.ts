import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AuthController (e2e)', () => {
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

  describe('/auth/register (POST)', () => {
    it('should register a new user', async () => {
      const response = await request(app.getHttpServer())
        .post('/auth/register')
        .send({
          name: 'Test User',
          email: `test-${Date.now()}@example.com`,
          password: 'password123',
        })
        .expect(201);

      expect(response.body).toHaveProperty('accessToken');
      expect(response.body).toHaveProperty('refreshToken');
    });

    it('should fail with invalid email', async () => {
      await request(app.getHttpServer())
        .post('/auth/register')
        .send({
          name: 'Test User',
          email: 'invalid-email',
          password: 'password123',
        })
        .expect(400);
    });

    it('should fail with short password', async () => {
      await request(app.getHttpServer())
        .post('/auth/register')
        .send({
          name: 'Test User',
          email: 'test@example.com',
          password: '123',
        })
        .expect(400);
    });
  });

  describe('/auth/login (POST)', () => {
    it('should login with valid credentials', async () => {
      const registerResponse = await request(app.getHttpServer())
        .post('/auth/register')
        .send({
          name: 'Login Test User',
          email: `login-test-${Date.now()}@example.com`,
          password: 'password123',
        });

      await request(app.getHttpServer())
        .post('/auth/login')
        .send({
          email: registerResponse.body.user?.email || 'test@example.com',
          password: 'password123',
        })
        .expect(201);
    });

    it('should fail with invalid credentials', async () => {
      await request(app.getHttpServer())
        .post('/auth/login')
        .send({
          email: 'nonexistent@example.com',
          password: 'wrongpassword',
        })
        .expect(401);
    });
  });

  describe('/users (GET)', () => {
    it('should require authentication', async () => {
      await request(app.getHttpServer()).get('/users').expect(401);
    });

    it('should return users when authenticated', async () => {
      const registerResponse = await request(app.getHttpServer())
        .post('/auth/register')
        .send({
          name: 'Auth Test User',
          email: `auth-test-${Date.now()}@example.com`,
          password: 'password123',
        });

      const token = registerResponse.body.accessToken;

      await request(app.getHttpServer())
        .get('/users')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);
    });
  });
});
