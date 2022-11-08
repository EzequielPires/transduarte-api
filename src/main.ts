import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { swaggerDocument } from './swaggerDocument';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const document = SwaggerModule.createDocument(app, swaggerDocument);
  SwaggerModule.setup('api', app, document);
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
