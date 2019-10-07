import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as session from 'express-session'
import { join } from 'path';
import { AppModule } from './app.module';
import * as hbs from 'hbs';
import * as passport from 'passport';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');
  
  hbs.registerPartials(join(__dirname, '..', 'views/partials'));

  app.use(
    session({
      secret: 'nest cats',
      resave: false,
      saveUninitialized: false,
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());
 
  await app.listen(3000);
}
bootstrap();
