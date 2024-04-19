/* eslint-disable prettier/prettier */
// trip.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TripService } from './trips.service';
import { Trip } from './entities/trip.entity';
import { CreateTripDto } from './dto/create-trip.dto';
import { UpdateTripDto } from './dto/update-trip.dto';
import { Truck } from 'src/trucks/entities/truck.entity';
import { Driver } from 'src/drivers/entities/driver.entity';
import { Shipment } from 'src/shipments/entities/shipment.entity';

describe('TripService', () => {
  let service: TripService;
  let repository: Repository<Trip>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TripService,
        {
          provide: getRepositoryToken(Trip),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            find: jest.fn(),
            findOne: jest.fn(),
            preload: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<TripService>(TripService);
    repository = module.get<Repository<Trip>>(getRepositoryToken(Trip));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new trip', async () => {
      const createTripDto: CreateTripDto = {
        routeFrom: 'New York',
        routeTo: 'Los Angeles',
        truckId: 1,
        driverIds: [1, 2],
      };

      const mockTrip: Trip = {
        id: 1,
        routeFrom: 'New York',
        routeTo: 'Los Angeles',
        truck: { id: 1 } as Truck,
        drivers: [{ id: 1 } as Driver, { id: 2 } as Driver],
        shipments: [],
      };
      jest.spyOn(repository, 'create').mockReturnValue(mockTrip);
      jest.spyOn(repository, 'save').mockResolvedValue(mockTrip);

      const result = await service.create(createTripDto);
      expect(repository.create).toHaveBeenCalledWith(createTripDto);
      expect(repository.save).toHaveBeenCalledWith(mockTrip);
      expect(result).toEqual(mockTrip);
    });
  });

  describe('findAll', () => {
    it('should return all trips', async () => {
      const mockTrips: Trip[] = [
        {
          id: 1,
          routeFrom: 'New York',
          routeTo: 'Los Angeles',
          truck: { id: 1 } as Truck,
          drivers: [],
          shipments: [],
        },
        {
          id: 2,
          routeFrom: 'Chicago',
          routeTo: 'Miami',
          truck: { id: 2 } as Truck,
          drivers: [],
          shipments: [],
        },
      ];
      jest.spyOn(repository, 'find').mockResolvedValue(mockTrips);

      const result = await service.findAll();
      expect(repository.find).toHaveBeenCalledWith({ relations: ['truck', 'drivers', 'shipments'] });
      expect(result).toEqual(mockTrips);
    });
  });

  describe('findOne', () => {
    it('should return a trip by id', async () => {
      const mockTrip: Trip = {
        id: 1,
        routeFrom: 'New York',
        routeTo: 'Los Angeles',
        truck: { id: 1 } as Truck,
        drivers: [],
        shipments: [],
      };
      jest.spyOn(repository, 'findOne').mockResolvedValue(mockTrip);

      const result = await service.findOne(1);
      expect(repository.findOne).toHaveBeenCalledWith({ where: { id: 1 }, relations: ['truck', 'drivers', 'shipments'] });
      expect(result).toEqual(mockTrip);
    });
  });

  describe('update', () => {
    it('should update a trip', async () => {
      const updateTripDto: UpdateTripDto = {
        routeFrom: 'New York',
        routeTo: 'Chicago',
        truckId: 1,
        driverIds: [2, 3],
        // shipments: [{ id: 4 } as Shipment, { id: 5 } as Shipment, { id: 6 } as Shipment],
      };

      const mockTrip: Trip = {
        id: 1,
        routeFrom: 'New York',
        routeTo: 'Chicago',
        truck: { id: 1 } as Truck,
        drivers: [{ id: 2 } as Driver, { id: 3 } as Driver],
        shipments: [{ id: 4 } as Shipment, { id: 5 } as Shipment, { id: 6 } as Shipment],
      };
      jest.spyOn(repository, 'preload').mockResolvedValue(mockTrip);
      jest.spyOn(repository, 'save').mockResolvedValue(mockTrip);

      const result = await service.update(1, updateTripDto);
      expect(repository.preload).toHaveBeenCalledWith({ id: 1, ...updateTripDto });
      expect(repository.save).toHaveBeenCalledWith(mockTrip);
      expect(result).toEqual(mockTrip);
    });

    it('should throw an error if trip not found', async () => {
      const updateTripDto: UpdateTripDto = {
        routeFrom: 'New York',
        routeTo: 'Chicago',
        truckId: 1,
        driverIds: [2, 3],
        // shipments: [{ id: 4 } as Shipment, { id: 5 } as Shipment, { id: 6 } as Shipment],
      };

      jest.spyOn(repository, 'preload').mockResolvedValue(null);

      await expect(service.update(1, updateTripDto)).rejects.toThrow('Trip not found');
    });
  });

  describe('remove', () => {
    it('should delete a trip', async () => {
      const mockTrip: Trip = {
        id: 1,
        routeFrom: 'New York',
        routeTo: 'Los Angeles',
        truck: { id: 1 } as Truck,
        drivers: [],
        shipments: [],
      };
      jest.spyOn(repository, 'findOne').mockResolvedValue(mockTrip);
      jest.spyOn(repository, 'remove').mockResolvedValue(undefined);
  
      await service.remove(1);
      expect(repository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(repository.remove).toHaveBeenCalledWith(mockTrip);
    });
  
    it('should throw an error if trip not found', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(null);
  
      await expect(service.remove(1)).rejects.toThrow('Trip not found');
    });
  });  
  
});