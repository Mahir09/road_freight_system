/* eslint-disable prettier/prettier */
// mechanic.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMechanicDto } from './dto/create-mechanic.dto';
import { UpdateMechanicDto } from './dto/update-mechanic.dto';
import { Mechanic } from './entities/mechanic.entity';

@Injectable()
export class MechanicService {
  constructor(
    @InjectRepository(Mechanic)
    private mechanicRepository: Repository<Mechanic>,
  ) {}

  create(createMechanicDto: CreateMechanicDto): Promise<Mechanic> {
    const mechanic = this.mechanicRepository.create(createMechanicDto);
    return this.mechanicRepository.save(mechanic);
  }

  findAll(): Promise<Mechanic[]> {
    return this.mechanicRepository.find();
  }

  findOne(id: number): Promise<Mechanic> {
    return this.mechanicRepository.findOneBy({ id });
  }

  async update(id: number, updateMechanicDto: UpdateMechanicDto): Promise<Mechanic> {
    const mechanic = await this.mechanicRepository.preload({
      id: id,
      ...updateMechanicDto,
    });
    if (!mechanic) {
      throw new Error('Mechanic not found');
    }
    return this.mechanicRepository.save(mechanic);
  }

  async remove(id: number): Promise<void> {
    const mechanic = await this.mechanicRepository.findOneBy({ id });
    if (!mechanic) {
      throw new Error('Mechanic not found');
    }
    await this.mechanicRepository.remove(mechanic);
  }
}
