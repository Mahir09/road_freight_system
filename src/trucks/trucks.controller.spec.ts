/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { TruckService } from './trucks.service';
import { Truck } from './entities/truck.entity';
import { TruckController } from './trucks.controller';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('TrucksController', () => {
  let controller: TruckController;
  let service: TruckService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TruckController],
      providers: [
        TruckService,
        {
          provide: getRepositoryToken(Truck),
          useValue: {
            find: jest.fn(),
            findOneBy: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
            preload: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();
  
    controller = module.get<TruckController>(TruckController);
    service = module.get<TruckService>(TruckService);
  });
  
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a Truck', async () => {
      const createTruckDto = { brand: "Volvo", load_capacity: 12000, year: 2015, number_of_repairs: 2 };
      const truck = { id: 1, ...createTruckDto, trips: [] };
      jest.spyOn(service, 'create').mockResolvedValue(truck);

      await expect(controller.create(createTruckDto)).resolves.toEqual(truck);
      expect(service.create).toHaveBeenCalledWith(createTruckDto);
    });
  });

  describe('findAll', () => {
    it('should return an array of Trucks', async () => {
      const trucks: Truck[] = [
        { id: 1, brand: "Volvo", load_capacity: 12000, year: 2015, number_of_repairs: 2, trips: [] },
        { id: 2, brand: "Scania", load_capacity: 10000, year: 2017, number_of_repairs: 1, trips: [] }
      ];
      jest.spyOn(service, 'findAll').mockResolvedValue(trucks);

      expect(await controller.findAll()).toEqual(trucks);
      expect(service.findAll).toHaveBeenCalledTimes(1);
    });
  });

  describe('findOne', () => {
    it('should return a Truck by id', async () => {
      const truck = { id: 1, brand: "Volvo", load_capacity: 12000, year: 2015, number_of_repairs: 2, trips: [] };
      jest.spyOn(service, 'findOne').mockResolvedValue(truck);

      expect(await controller.findOne("1")).toEqual(truck);
      expect(service.findOne).toHaveBeenCalledWith(1);
    });
  });

  describe('update', () => {
    it('should update a Truck by id', async () => {
      const updateTruckDto = { brand: "Mercedes", load_capacity: 15000 };
      const truck = { id: 1, brand: "Mercedes", load_capacity: 15000, year: 2015, number_of_repairs: 2, trips: [] };
      jest.spyOn(service, 'update').mockResolvedValue(truck);

      expect(await controller.update("1", updateTruckDto)).toEqual(truck);
      expect(service.update).toHaveBeenCalledWith(1, updateTruckDto);
    });
  });

  describe('remove', () => {
    it('should delete a Truck by id', async () => {
      jest.spyOn(service, 'remove').mockResolvedValue();

      expect(await controller.remove("1")).toBeUndefined();
      expect(service.remove).toHaveBeenCalledWith(1);
    });
  });
});
