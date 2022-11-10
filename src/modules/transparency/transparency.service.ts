import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTransparencyDto } from './dto/create-transparency.dto';
import { UpdateTransparencyDto } from './dto/update-transparency.dto';
import { Transparency } from './entities/transparency.entity';

@Injectable()
export class TransparencyService {
  constructor(@InjectRepository(Transparency) private transparencyRepository: Repository<Transparency>) {}

  async create(createTransparencyDto: CreateTransparencyDto) {
    try {
      const {month, year} = createTransparencyDto;
      const transparencyAlreadyExists = await this.transparencyRepository.findOne({where: {month, year}});
      const date = new Date();
      
      if(month > date.getMonth() || year > date.getFullYear()) throw new Error('Invalid date');
      if(transparencyAlreadyExists) throw new Error('Transparency already exists');

      const transparency = this.transparencyRepository.create(createTransparencyDto);

      return {
        success: true,
        transparency: await this.transparencyRepository.save(transparency)
      }
    } catch (error) {
      return {
        success: false,
        message: error.message
      }
    }
  }

  async findAll() {
    return await this.transparencyRepository.find();
  }

  async findByDate(month: number, year: number) {
    try {
      const yearlys = await this.transparencyRepository.findBy({year});
      let total_trip = 0;
			let total_passengers = 0;
			let total_free = 0;
			let total_mileage = 0;

      yearlys.forEach(item => {
        total_free = total_free + item.total_free;
        total_trip = total_trip + item.total_trip;
        total_passengers = total_passengers + item.total_passengers;
        total_mileage = total_mileage + item.total_mileage;
      })

      const transparency = await this.transparencyRepository.findOne({where: {month, year}});

      if(!transparency) throw new Error('Transparency not already exists');

      return {
        success: true,
        yearly: {
          total_free,
          total_mileage,
          total_passengers,
          total_trip
        },
        transparency
      }
    } catch (error) {
      return {
        success: false,
        message: error.message
      }
    }
  }

  async findOne(id: string) {
    return await this.transparencyRepository.findOneBy({id});
  }

  async update(id: string, updateTransparencyDto: UpdateTransparencyDto) {
    try {
      const {month, year} = updateTransparencyDto;
      if(month && year) {
        const transparencyAlreadyExists = await this.transparencyRepository.find({where: {month, year}});
  
        transparencyAlreadyExists.forEach(item => {
          if(item.id != id) {
            throw new Error('There is already another transparency with that date, select a different date.');
          }
        });
      }

      const transparency = await this.transparencyRepository.findOneBy({id});

      if(!transparency) throw new Error('Transparency not already exists');

      await this.transparencyRepository.update(id, updateTransparencyDto);

      return {
        success: true,
        transparency: await this.transparencyRepository.findOneBy({id})
      }

    } catch (error) {
      return {
        success: false,
        message: error.message
      }
    }
  }

  remove(id: number) {
    return `This action removes a #${id} transparency`;
  }
}
