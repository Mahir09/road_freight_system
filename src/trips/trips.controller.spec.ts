/* eslint-disable prettier/prettier */
// trip.controller.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { TripController } from './trips.controller';
import { TripService } from './trips.service';
import { CreateTripDto } from './dto/create-trip.dto';
import { UpdateTripDto } from './dto/update-trip.dto';
import { Trip } from './entities/trip.entity';
import { Truck } from 'src/trucks/entities/truck.entity';
import { Driver } from 'src/drivers/entities/driver.entity';
import { Shipment } from 'src/shipments/entities/shipment.entity';

describe('TripController', () => {
  let controller: TripController;
  let service: TripService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TripController],
      providers: [
        {
          provide: TripService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<TripController>(TripController);
    service = module.get<TripService>(TripService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
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
      jest.spyOn(service, 'create').mockResolvedValue(mockTrip);

      const result = await controller.create(createTripDto);
      expect(service.create).toHaveBeenCalledWith(createTripDto);
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
      jest.spyOn(service, 'findAll').mockResolvedValue(mockTrips);

      const result = await controller.findAll();
      expect(service.findAll).toHaveBeenCalled();
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
      jest.spyOn(service, 'findOne').mockResolvedValue(mockTrip);

      const result = await controller.findOne('1');
      expect(service.findOne).toHaveBeenCalledWith(1);
      expect(result).toEqual(mockTrip);
    });
  });

  describe('update', () => {
    it('should update a trip', async () => {
      const updateTripDto: UpdateTripDto = {
        routeFrom: 'New York',
        routeTo: 'Chicago',
        // shipments: [{ id: 4 } as Shipment, { id: 5 } as Shipment, { id: 6 } as Shipment],
        truckId:  1,
        driverIds: [2, 3],
      };

      const mockTrip: Trip = {
        id: 1,
        routeFrom: 'New York',
        routeTo: 'Chicago',
        truck: { id: 1 } as Truck,
        drivers: [{ id: 2 } as Driver, { id: 3 } as Driver],
        shipments: [{ id: 4 } as Shipment, { id: 5 } as Shipment, { id: 6 } as Shipment],
      };
      jest.spyOn(service, 'update').mockResolvedValue(mockTrip);

      const result = await controller.update('1', updateTripDto);
      expect(service.update).toHaveBeenCalledWith(1, updateTripDto);
      expect(result).toEqual(mockTrip);
    });
  });

  describe('remove', () => {
    it('should delete a trip', async () => {
      jest.spyOn(service, 'remove').mockResolvedValue(undefined);

      await controller.remove('1');
      expect(service.remove).toHaveBeenCalledWith(1);
    });
  });
});