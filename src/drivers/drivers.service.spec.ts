/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { DriverService } from './drivers.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Driver } from './entities/driver.entity';

describe('DriverService', () => {
  let service: DriverService;
  let mockRepository: jest.Mocked<Repository<Driver>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DriverService,
        {
          provide: getRepositoryToken(Driver),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            find: jest.fn(),
            findOneBy: jest.fn(),
            preload: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<DriverService>(DriverService);
    mockRepository = module.get<Repository<Driver>>(getRepositoryToken(Driver)) as jest.Mocked<Repository<Driver>>;
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should successfully create a driver', async () => {
      const driverDto = { name: 'John', surname: 'Doe', seniority: 5, drivingCategory: 'B' };
      const driver: Driver = { ...driverDto, id: 1 };
      mockRepository.create.mockReturnValue(driver);
      mockRepository.save.mockResolvedValue(driver);

      await expect(service.create(driverDto)).resolves.toEqual(driver);
      expect(mockRepository.create).toHaveBeenCalledWith(driverDto);
      expect(mockRepository.save).toHaveBeenCalledWith(driver);
    });
  });

  describe('findAll', () => {
    it('should return an array of drivers', async () => {
      const drivers: Driver[] = [{ id: 1, name: 'John', surname: 'Doe', seniority: 5, drivingCategory: 'B' }];
      mockRepository.find.mockResolvedValue(drivers);

      await expect(service.findAll()).resolves.toEqual(drivers);
      expect(mockRepository.find).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a driver by id', async () => {
      const driver: Driver = { id: 1, name: 'John', surname: 'Doe', seniority: 5, drivingCategory: 'B' };
      mockRepository.findOneBy.mockResolvedValue(driver);

      await expect(service.findOne(1)).resolves.toEqual(driver);
      expect(mockRepository.findOneBy).toHaveBeenCalledWith({ id: 1 });
    });
  });

  describe('update', () => {
    it('should update a driver', async () => {
      const driver: Driver = { id: 1, name: 'John', surname: 'Doe', seniority: 5, drivingCategory: 'B' };
      const updateDriverDto = { name: 'Johnny' };
      const updatedDriver = { ...driver, ...updateDriverDto };
      mockRepository.preload.mockResolvedValue(updatedDriver);
      mockRepository.save.mockResolvedValue(updatedDriver);

      await expect(service.update(1, updateDriverDto)).resolves.toEqual(updatedDriver);
      expect(mockRepository.preload).toHaveBeenCalledWith({ id: 1, ...updateDriverDto });
      expect(mockRepository.save).toHaveBeenCalledWith(updatedDriver);
    });
  });

  describe('remove', () => {
    it('should remove a driver', async () => {
      const driver: Driver = { id: 1, name: 'John', surname: 'Doe', seniority: 5, drivingCategory: 'B' };
      mockRepository.findOneBy.mockResolvedValue(driver);
      mockRepository.remove.mockResolvedValue(driver);

      await expect(service.remove(1)).resolves.toBeUndefined();
      expect(mockRepository.findOneBy).toHaveBeenCalledWith({ id: 1 });
      expect(mockRepository.remove).toHaveBeenCalledWith(driver);
    });
  });
});
