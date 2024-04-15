// trip.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTripDto } from './dto/create-trip.dto';
import { UpdateTripDto } from './dto/update-trip.dto';
import { Trip } from './entities/trip.entity';

@Injectable()
export class TripService {
  constructor(
    @InjectRepository(Trip)
    private tripRepository: Repository<Trip>,
  ) {}

  create(createTripDto: CreateTripDto): Promise<Trip> {
    const trip = this.tripRepository.create(createTripDto);
    return this.tripRepository.save(trip);
  }

  findAll(): Promise<Trip[]> {
    return this.tripRepository.find({ relations: ['truck', 'drivers', 'shipments'] });
  }

  findOne(id: number): Promise<Trip> {
    return this.tripRepository.findOne({
      where: { id },
      relations: ['truck', 'drivers', 'shipments']
    });
  }

  async update(id: number, updateTripDto: UpdateTripDto): Promise<Trip> {
    const trip = await this.tripRepository.preload({
      id,
      ...updateTripDto
    });
    if (!trip) {
      throw new Error('Trip not found');
    }
    return this.tripRepository.save(trip);
  }

  async remove(id: number): Promise<void> {
    const trip = await this.tripRepository.findOneBy({ id });
    if (!trip) {
      throw new Error('Trip not found');
    }
    await this.tripRepository.remove(trip);
  }
}
