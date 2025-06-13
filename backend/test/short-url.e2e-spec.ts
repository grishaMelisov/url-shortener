import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('ShortUrl (e2e)', () => {
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

  it('link creating', async () => {
    const alias = 'testalias1';

    const res = await request(app.getHttpServer())
      .post('/shorten')
      .send({
        originalUrl: 'https://example.com',
        alias,
      })
      .expect(200);

    expect(res.body).toHaveProperty('shortUrl');
    expect(res.body.shortUrl).toContain(alias);
  });
});
