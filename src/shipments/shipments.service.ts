// shipment.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateShipmentDto } from './dto/create-shipment.dto';
import { UpdateShipmentDto } from './dto/update-shipment.dto';
import { Shipment } from './entities/shipment.entity';

@Injectable()
export class ShipmentService {
  constructor(
    @InjectRepository(Shipment)
    private shipmentRepository: Repository<Shipment>,
  ) {}

  create(createShipmentDto: CreateShipmentDto): Promise<Shipment> {
    const shipment = this.shipmentRepository.create(createShipmentDto);
    return this.shipmentRepository.save(shipment);
  }

  findAll(): Promise<Shipment[]> {
    return this.shipmentRepository.find({ relations: ['trip'] });
  }

  findOne(id: number): Promise<Shipment> {
    return this.shipmentRepository.findOne({
      where: { id },
      relations: ['trip']
    });
  }

  async update(id: number, updateShipmentDto: UpdateShipmentDto): Promise<Shipment> {
    const shipment = await this.shipmentRepository.preload({
      id: id,
      ...updateShipmentDto
    });
    if (!shipment) {
      throw new Error('Shipment not found');
    }
    return this.shipmentRepository.save(shipment);
  }

  async remove(id: number): Promise<void> {
    const shipment = await this.shipmentRepository.findOneBy({ id });
    if (!shipment) {
      throw new Error('Shipment not found');
    }
    await this.shipmentRepository.remove(shipment);
  }
}
