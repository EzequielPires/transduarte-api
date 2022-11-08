import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

export const swaggerDocument = new DocumentBuilder()
    .setTitle("Scheduling System")
    .setDescription('The scheduling system API description')
    .setVersion('1.0')
    .addTag('user')
    .build();