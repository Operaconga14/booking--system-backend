import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = app.get(ConfigService)

  app.setGlobalPrefix(`${config.get('API_PREFIX')}`)

  await app.listen(config.get('PORT') ?? 3001);
}
bootstrap();
