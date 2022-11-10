import { Module } from '@nestjs/common';
import { TransparencyService } from './transparency.service';
import { TransparencyController } from './transparency.controller';
import { Transparency } from './entities/transparency.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Transparency])],
  controllers: [TransparencyController],
  providers: [TransparencyService]
})
export class TransparencyModule {}
