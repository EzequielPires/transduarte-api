import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './modules/user/user.module';
import { ServiceModule } from './modules/service/service.module';
import { SchedulingModule } from './modules/scheduling/scheduling.module';
import { AuthModule } from './auth/auth.module';
import { OpeningHoursModule } from './modules/opening-hours/opening-hours.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'us-cdbr-east-06.cleardb.net',
    port: 3306,
    username: 'bb8f8e2b25d19a',
    password: '073df859',
    database: 'heroku_4315b08f9152bac',
    entities: ["dist/**/*.entity{.ts,.js}"],
    synchronize: true,
  }),
    UserModule, ServiceModule, SchedulingModule, AuthModule, OpeningHoursModule,
  ],
  controllers: [],
  providers: [],
})

export class AppModule { }
