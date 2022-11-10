import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './auth/auth.module';
import { TransparencyModule } from './modules/transparency/transparency.module';
import { join } from 'path';
import {ServeStaticModule} from '@nestjs/serve-static';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', ''),
    }),
    TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'duarteapi-db.mysql.uhserver.com',
    port: 3306,
    username: 'duarteapi_db',
    password: 'P9KAxQArMuS29a.',
    database: 'duarteapi_db',
    entities: ["dist/**/*.entity{.ts,.js}"],
    synchronize: true,
  }),
    UserModule, AuthModule, TransparencyModule,
  ],
  controllers: [],
  providers: [],
})

export class AppModule { }
