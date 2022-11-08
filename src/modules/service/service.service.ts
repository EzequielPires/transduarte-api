import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { Service } from './entities/service.entity';

@Injectable()
export class ServiceService {
  constructor(@InjectRepository(Service) private serviceRepository: Repository<Service>) {}

  async create(createServiceDto: CreateServiceDto) {
    try {
        const service = this.serviceRepository.create(createServiceDto);

        return {
          success: true,
          service: await this.serviceRepository.save(service)
        }
    } catch (error) {
      return {
        success: false,
        message: error.message
      }
    }
  }

  async findAll() {
    return await this.serviceRepository.find();
  }

  async findOne(id: number) {
    return await this.serviceRepository.findOneBy({id});
  }

  async update(id: number, updateServiceDto: UpdateServiceDto) {
    try {
      const serviceAlreadyExists = await this.serviceRepository.findOneBy({id});

      if(!serviceAlreadyExists) throw new Error('Service not found.')

      await this.serviceRepository.update(id, updateServiceDto);

      return {
        success: true,
        service: await this.serviceRepository.findOneBy({id})
      }
    } catch (error) {
      return {
        success: false,
        message: error.message
      }
    }
  }

  async remove(id: number) {
    try {
      const serviceAlreadyExists = await this.serviceRepository.findOneBy({id});

      if(!serviceAlreadyExists) throw new Error('Service not found.')

      await this.serviceRepository.delete(id);

      return {
        success: true,
        service: 'Service removed successfully'
      }
    } catch (error) {
      return {
        success: false,
        message: error.message
      }
    }
  }
}
