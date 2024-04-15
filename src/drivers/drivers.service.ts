// driver.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDriverDto } from './dto/create-driver.dto';
import { UpdateDriverDto } from './dto/update-driver.dto';
import { Driver } from './entities/driver.entity';

@Injectable()
export class DriverService {
  constructor(
    @InjectRepository(Driver)
    private driverRepository: Repository<Driver>,
  ) {}

  create(createDriverDto: CreateDriverDto): Promise<Driver> {
    const driver = this.driverRepository.create(createDriverDto);
    return this.driverRepository.save(driver);
  }

  findAll(): Promise<Driver[]> {
    return this.driverRepository.find();
  }

  findOne(id: number): Promise<Driver> {
    return this.driverRepository.findOneBy({ id });
  }

  async update(id: number, updateDriverDto: UpdateDriverDto): Promise<Driver> {
    const driver = await this.driverRepository.preload({
      id: id,
      ...updateDriverDto,
    });
    if (!driver) {
      throw new Error('Driver not found');
    }
    return this.driverRepository.save(driver);
  }

  async remove(id: number): Promise<void> {
    const driver = await this.driverRepository.findOneBy({ id });
    if (!driver) {
      throw new Error('Driver not found');
    }
    await this.driverRepository.remove(driver);
  }
}
