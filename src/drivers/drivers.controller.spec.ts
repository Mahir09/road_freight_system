/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { DriverController } from './drivers.controller';
import { DriverService } from './drivers.service';

describe('DriverController', () => {
  let controller: DriverController;
  let service: DriverService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DriverController],
      providers: [
        {
          provide: DriverService,
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

    controller = module.get<DriverController>(DriverController);
    service = module.get<DriverService>(DriverService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should return a newly created driver', async () => {
      const driverDto = { name: 'John', surname: 'Doe', seniority: 5, drivingCategory: 'B' };
      const driver = { ...driverDto, id: 1 };
      jest.spyOn(service, 'create').mockResolvedValue(driver);

      await expect(controller.create(driverDto)).resolves.toEqual(driver);
    });
  });

  describe('findAll', () => {
    it('should return an array of drivers', async () => {
      const drivers = [{ id: 1, name: 'John', surname: 'Doe', seniority: 5, drivingCategory: 'B' }];
      jest.spyOn(service, 'findAll').mockResolvedValue(drivers);

      await expect(controller.findAll()).resolves.toEqual(drivers);
    });
  });

  describe('findOne', () => {
    it('should return a driver by id', async () => {
      const driver = { id: 1, name: 'John', surname: 'Doe', seniority: 5, drivingCategory: 'B' };
      jest.spyOn(service, 'findOne').mockResolvedValue(driver);

      await expect(controller.findOne('1')).resolves.toEqual(driver);
    });
  });

  describe('update', () => {
    it('should return the updated driver', async () => {
      const driver = { id: 1, name: 'John', surname: 'Doe', seniority: 5, drivingCategory: 'B' };
      const updateDto = { name: 'Johnny' };
      const updatedDriver = { ...driver, ...updateDto };
      jest.spyOn(service, 'update').mockResolvedValue(updatedDriver);

      await expect(controller.update('1', updateDto)).resolves.toEqual(updatedDriver);
    });
  });

  describe('remove', () => {
    it('should remove the driver', async () => {
      jest.spyOn(service, 'remove').mockResolvedValue(undefined);

      await expect(controller.remove('1')).resolves.toBeUndefined();
    });
  });
});
