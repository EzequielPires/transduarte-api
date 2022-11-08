import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOpeningHourDto } from './dto/create-opening-hour.dto';
import { UpdateOpeningHourDto } from './dto/update-opening-hour.dto';
import { daysOfTheWeek, OpeningHour } from './entities/opening-hour.entity';

@Injectable()
export class OpeningHoursService {
  constructor(@InjectRepository(OpeningHour) private openingHourRepository: Repository<OpeningHour>) { }

  async isValidOpeningHour(createOpeningHourDto: CreateOpeningHourDto) {
    let isValid = true;
    const { day, end, start } = createOpeningHourDto;
    const openingHours = await this.openingHourRepository.findBy({ day })
    const [hoursStart, minutesStart] = start.split(':');
    const [hoursEnd, minutesEnd] = end.split(':');
    const date = new Date();
    const dateStart = new Date(`${date.getDate()} ${hoursStart}:${minutesStart}:00:00`).getTime();
    const dateEnd = new Date(`${date.getDate()} ${hoursEnd}:${minutesEnd}:00:00`).getTime();
    openingHours.forEach(item => {
      const [hoursStart, minutesStart] = item.start.split(':');
      const [hoursEnd, minutesEnd] = item.end.split(':');
      const startTime = new Date(`${date.getDate()} ${hoursStart}:${minutesStart}:00:00`).getTime();
      const endTime = new Date(`${date.getDate()} ${hoursEnd}:${minutesEnd}:00:00`).getTime();
      if (((dateStart < startTime && dateEnd <= startTime) || (dateStart > startTime && dateStart >= endTime)) && (dateStart < dateEnd)) { }
      else {
        isValid = false;
      }
    });
    return isValid;
  }

  async create(createOpeningHourDto: CreateOpeningHourDto) {
    try {
      const { day, end, start } = createOpeningHourDto;
      const regex = /^\d{2}:\d{2}$/;
      const reg = new RegExp(regex);

      if (!(<any>Object).values(daysOfTheWeek).includes(day)) throw new Error('Invalid day of the week');
      if (!reg.test(start)) throw new Error('Has invalid start');
      if (!reg.test(end)) throw new Error('Has an invalid ending');

      const isValid = await this.isValidOpeningHour(createOpeningHourDto);

      if (!isValid) throw new Error('Invalid time');

      const openingHour = this.openingHourRepository.create(createOpeningHourDto);

      return {
        success: true,
        openingHour: await this.openingHourRepository.save(openingHour)
      }
    } catch (error) {
      return {
        success: false,
        message: error.message
      }
    }
  }

  async findAll() {
    const segunda = await this.openingHourRepository.findBy({day: 'segunda'});
    const terca = await this.openingHourRepository.findBy({day: 'terca'});
    const quarta = await this.openingHourRepository.findBy({day: 'quarta'});
    const quinta = await this.openingHourRepository.findBy({day: 'quinta'});
    const sexta = await this.openingHourRepository.findBy({day: 'sexta'});
    const sabado = await this.openingHourRepository.findBy({day: 'sabado'});
    const domingo = await this.openingHourRepository.findBy({day: 'domingo'});
    return {
      segunda,
      terca,
      quarta,
      quinta,
      sexta,
      sabado,
      domingo
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} openingHour`;
  }

  update(id: number, updateOpeningHourDto: UpdateOpeningHourDto) {
    return `This action updates a #${id} openingHour`;
  }

  remove(id: number) {
    return `This action removes a #${id} openingHour`;
  }
}
