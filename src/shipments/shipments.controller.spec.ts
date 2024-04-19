/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { CreateShipmentDto } from './dto/create-shipment.dto';
import { UpdateShipmentDto } from './dto/update-shipment.dto';
import { ShipmentController } from './shipments.controller';
import { ShipmentService } from './shipments.service';
import { Trip } from '../trips/entities/trip.entity';
import { Shipment } from './entities/shipment.entity';

describe('ShipmentController', () => {
  let controller: ShipmentController;
  let service: ShipmentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ShipmentController],
      providers: [
        {
          provide: ShipmentService,
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

    controller = module.get<ShipmentController>(ShipmentController);
    service = module.get<ShipmentService>(ShipmentService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new shipment', async () => {
      const createShipmentDto: CreateShipmentDto = { weight: 10, value: 50.5, tripId: 1 };
      
      // Assuming `trip` is also required as part of the Shipment entity
      const mockTrip = new Trip();
      mockTrip.id = createShipmentDto.tripId; // Example setup, adjust according to your entity structure

      // Complete Shipment object, including required properties
      const result: Shipment = {
        id: 1,
        weight: createShipmentDto.weight,
        value: createShipmentDto.value,
        trip: mockTrip,
      };

      jest.spyOn(service, 'create').mockResolvedValue(result);
  
      expect(await controller.create(createShipmentDto)).toEqual(result);
      expect(service.create).toHaveBeenCalledWith(createShipmentDto);
    });
});
  
  

  describe('findAll', () => {
    it('should return all shipments', () => {
      controller.findAll();

      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a shipment by id', async () => {
      const shipment = { id: 1, weight: 10, value: 50.5, trip: new Trip() };
      jest.spyOn(service, 'findOne').mockResolvedValue(shipment);
  
      expect(await controller.findOne("1")).toEqual(shipment);
      expect(service.findOne).toHaveBeenCalledWith(1);
    });
  });

  describe('update', () => {
    it('should update a shipment by id', () => {
      const updateShipmentDto: UpdateShipmentDto = {
        weight: 20,
        value: 100.0,
        tripId: 1,
      };

      controller.update("1", updateShipmentDto);

      expect(service.update).toHaveBeenCalledWith(1, updateShipmentDto);
    });
  });

  describe('remove', () => {
    it('should delete a shipment by id', () => {
      controller.remove("1");

      expect(service.remove).toHaveBeenCalledWith(1);
    });
  });
});