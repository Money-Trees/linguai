import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import PGSimple from 'connect-pg-simple';
import session from 'express-session';
import passport from 'passport';
import pg from 'pg';
import { AppModule } from './app/app.module';
import { pgConnection } from './database/database.config';
import { TypeormExceptionFilter } from './database/typeorm.filter';
import { env } from './env';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.enableCors({
    credentials: true,
    origin: [env.APP_URL, env.API_URL].filter(Boolean),
  });
  app.setGlobalPrefix(globalPrefix);
  app.use(
    session({
      store: new (PGSimple(session))({
        createTableIfMissing: true,
        pool: new pg.Pool(pgConnection),
      }),
      cookie: {
        maxAge: 30 * 24 * 60 * 60 * 1000,
      },
      secret: env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new TypeormExceptionFilter());

  const config = new DocumentBuilder().build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(globalPrefix, app, document);

  await app.listen(env.PORT);
  Logger.log(
    `🚀 Application is running on: http://localhost:${env.PORT}/${globalPrefix}`
  );
}

bootstrap();
