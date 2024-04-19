/* eslint-disable prettier/prettier */
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTruckDto } from './dto/create-truck.dto';
import { UpdateTruckDto } from './dto/update-truck.dto';
import { Truck } from './entities/truck.entity';

@Injectable()
export class TruckService {
    constructor(
        @InjectRepository(Truck)
        private truckRepository: Repository<Truck>,
    ) {}

    async findAll(): Promise<Truck[]> {
        try {
          return await this.truckRepository.find();
        } catch (error) {
          console.error('Failed to fetch trucks:', error);
          throw new InternalServerErrorException(error);
        }
      }

    findOne(id: number): Promise<Truck> {
        return this.truckRepository.findOneBy({ id });
    }

    async create(truckData: CreateTruckDto): Promise<Truck> {
        const truck = this.truckRepository.create(truckData);
        await this.truckRepository.save(truck);
        return truck;
    }

    async update(id: number, truckData: UpdateTruckDto): Promise<Truck> {
        const truck = await this.truckRepository.preload({
            id: id,
            ...truckData,
        });
        if (!truck) {
            throw new Error('Truck not found');
        }
        return this.truckRepository.save(truck);
    }

    async remove(id: number): Promise<void> {
        await this.truckRepository.delete(id);
    }
}
