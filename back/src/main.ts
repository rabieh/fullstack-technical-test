import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('/api');
  app.use(helmet());
  app.enableCors({ origin: 'http://localhost:3000' });
  await app.listen(4000);
}
bootstrap();
