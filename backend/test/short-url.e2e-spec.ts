import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('ShortUrl (e2e)', () => {
  let app: INestApplication;
  const alias = 'testalias1';
  const originalUrl = 'https://example.com';

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

  it('alias creating', async () => {
    const res = await request(app.getHttpServer())
      .post('/shorten')
      .send({
        originalUrl,
        alias,
      })
      .expect(200);

    expect(res.body).toHaveProperty('shortUrl');
    expect(res.body.shortUrl).toContain(alias);
  });

  it('should redirect to the original URL using previously created alias', async () => {
    const res = await request(app.getHttpServer()).get(`/${alias}`).expect(302);

    expect(res.header).toHaveProperty('location');
    expect(res.header.location).toBe(originalUrl);
  });

  it('error if try to create existing alias', async () => {
    const res = await request(app.getHttpServer())
      .post('/shorten')
      .send({
        originalUrl: originalUrl,
        alias,
      })
      .expect(400);

    expect(res.body.message).toContain('already in use');
  });

  it('delete alias', async () => {
    await request(app.getHttpServer()).delete(`/delete/${alias}`).expect(200);
  });

  it('error if try to delete absent alias', async () => {
    await request(app.getHttpServer()).delete(`/delete/${alias}`).expect(404);
  });
});
