/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Shipment } from './entities/shipment.entity';
import { Trip } from '../trips/entities/trip.entity';
import { CreateShipmentDto } from './dto/create-shipment.dto';
import { UpdateShipmentDto } from './dto/update-shipment.dto';
import { ShipmentService } from './shipments.service';

describe('ShipmentService', () => {
  let service: ShipmentService;
  let repository: Repository<Shipment>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ShipmentService,
        {
          provide: getRepositoryToken(Shipment),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<ShipmentService>(ShipmentService);
    repository = module.get<Repository<Shipment>>(getRepositoryToken(Shipment));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new shipment', async () => {
      const createShipmentDto: CreateShipmentDto = {
        weight: 10,
        value: 50.5,
        tripId: 1,
      };

      const newShipment = new Shipment();
      Object.assign(newShipment, createShipmentDto);

      jest.spyOn(repository, 'create').mockReturnValue(newShipment);
      jest.spyOn(repository, 'save').mockResolvedValue(newShipment);

      expect(await service.create(createShipmentDto)).toEqual(newShipment);
      expect(repository.create).toHaveBeenCalledWith(createShipmentDto);
      expect(repository.save).toHaveBeenCalledWith(newShipment);
    });
  });

  describe('findAll', () => {
    it('should return all shipments', async () => {
      const shipments: Shipment[] = [
        {
          id: 1,
          weight: 10,
          value: 50.5,
          trip: new Trip(),
        },
        {
          id: 2,
          weight: 20,
          value: 100.0,
          trip: new Trip(),
        },
      ];

      jest.spyOn(repository, 'find').mockResolvedValue(shipments);

      expect(await service.findAll()).toEqual(shipments);
      expect(repository.find).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a shipment by id', async () => {
      const shipment: Shipment = {
        id: 1,
        weight: 10,
        value: 50.5,
        trip: new Trip(),
      };

      jest.spyOn(repository, 'findOne').mockResolvedValue(shipment);

      expect(await service.findOne(1)).toEqual(shipment);
      expect(repository.findOne).toHaveBeenCalledWith({
        where: { id: 1 },
        relations: ['trip'],
      });
    });
  });

  describe('update', () => {
    it('should update a shipment by id', async () => {
      const updateShipmentDto: UpdateShipmentDto = { weight: 20, value: 100.0, tripId: 1 };
      const existingShipment: Shipment = { id: 1, weight: 10, value: 50.5, trip: new Trip() };
      const updatedShipment = { ...existingShipment, ...updateShipmentDto };
  
      jest.spyOn(repository, 'preload').mockResolvedValue(updatedShipment);
      jest.spyOn(repository, 'save').mockResolvedValue(updatedShipment);
  
      expect(await service.update(1, updateShipmentDto)).toEqual(updatedShipment);
      expect(repository.preload).toHaveBeenCalledWith({ id: 1, ...updateShipmentDto });
      expect(repository.save).toHaveBeenCalledWith(updatedShipment);
    });
  });

  describe('remove', () => {
    it('should delete a shipment by id', async () => {
      const shipment: Shipment = {
        id: 1,
        weight: 10,
        value: 50.5,
        trip: new Trip(),
      };

      jest.spyOn(repository, 'findOneBy').mockResolvedValue(shipment);
      jest.spyOn(repository, 'remove').mockResolvedValue(undefined);

      expect(await service.remove(1)).toBeUndefined();
      expect(repository.findOneBy).toHaveBeenCalledWith({ id: 1 });
      expect(repository.remove).toHaveBeenCalledWith(shipment);
    });
  });
});