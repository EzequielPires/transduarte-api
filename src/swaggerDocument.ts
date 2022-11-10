import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

export const swaggerDocument = new DocumentBuilder()
    .setTitle("Transduarte System")
    .setDescription('The tranduarte system API description')
    .setVersion('1.0')
    .addTag('user')
    .addTag('transparency')
    .build();