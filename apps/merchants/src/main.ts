import { NestFactory } from '@nestjs/core';
import { MerchantsModule } from './merchants.module';

async function bootstrap() {
  const app = await NestFactory.create(MerchantsModule);
  await app.listen(3000);
}
bootstrap();
