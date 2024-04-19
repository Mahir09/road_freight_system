/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { TruckService } from './trucks.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Truck } from './entities/truck.entity';
import { Repository } from 'typeorm';
import { CreateTruckDto } from './dto/create-truck.dto';
import { UpdateTruckDto } from './dto/update-truck.dto';

describe('TruckService', () => {
  let service: TruckService;
  let repository: Repository<Truck>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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

    service = module.get<TruckService>(TruckService);
    repository = module.get<Repository<Truck>>(getRepositoryToken(Truck));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of Trucks', async () => {
      const mockTrucks: Truck[] = [
        { id: 1, brand: 'Volvo', load_capacity: 10000, year: 2020, number_of_repairs: 2, trips: [] },
        { id: 2, brand: 'Scania', load_capacity: 15000, year: 2021, number_of_repairs: 1, trips: [] }
      ];
      jest.spyOn(repository, 'find').mockResolvedValue(mockTrucks);

      expect(await service.findAll()).toEqual(mockTrucks);
      expect(repository.find).toHaveBeenCalledTimes(1);
    });
  });

  describe('findOne', () => {
    it('should return a Truck by id', async () => {
      const mockTruck: Truck = { id: 1, brand: 'Volvo', load_capacity: 10000, year: 2020, number_of_repairs: 2, trips: [] };
      jest.spyOn(repository, 'findOneBy').mockResolvedValue(mockTruck);

      expect(await service.findOne(1)).toEqual(mockTruck);
      expect(repository.findOneBy).toHaveBeenCalledWith({ id: 1 });
    });
  });

  describe('create', () => {
    it('should create a new Truck', async () => {
      const createTruckDto: CreateTruckDto = {
        brand: 'Mercedes', load_capacity: 8000, year: 2019, number_of_repairs: 0
      };
      const expectedTruck: Truck = { id: 3, ...createTruckDto, trips: [] };
      jest.spyOn(repository, 'create').mockReturnValue(expectedTruck);
      jest.spyOn(repository, 'save').mockResolvedValue(expectedTruck);

      expect(await service.create(createTruckDto)).toEqual(expectedTruck);
      expect(repository.create).toHaveBeenCalledWith(createTruckDto);
      expect(repository.save).toHaveBeenCalledWith(expectedTruck);
    });
  });

  describe('update', () => {
    it('should update a Truck by id', async () => {
      const updateTruckDto: UpdateTruckDto = { brand: 'MAN', load_capacity: 12000, year: 2018, number_of_repairs: 3 };
      const existingTruck: Truck = { id: 1, brand: 'Volvo', load_capacity: 10000, year: 2020, number_of_repairs: 2, trips: [] };
      const updatedTruck: Truck = { ...existingTruck, ...updateTruckDto };
      jest.spyOn(repository, 'preload').mockResolvedValue(updatedTruck);
      jest.spyOn(repository, 'save').mockResolvedValue(updatedTruck);

      expect(await service.update(1, updateTruckDto)).toEqual(updatedTruck);
      expect(repository.preload).toHaveBeenCalledWith({ id: 1, ...updateTruckDto });
      expect(repository.save).toHaveBeenCalledWith(updatedTruck);
    });
  });

  describe('remove', () => {
    it('should delete a Truck by id', async () => {
      const deleteResult = { affected: 1, raw: {} }; // Matching the expected DeleteResult type
      jest.spyOn(repository, 'delete').mockResolvedValue(deleteResult);
  
      await expect(service.remove(1)).resolves.toBeUndefined();
      expect(repository.delete).toHaveBeenCalledWith(1);
    });
  });
  
});
