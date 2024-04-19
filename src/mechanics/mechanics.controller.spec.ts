/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { MechanicController } from './mechanics.controller';
import { MechanicService } from './mechanics.service';

describe('MechanicController', () => {
  let controller: MechanicController;
  let service: MechanicService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MechanicController],
      providers: [
        {
          provide: MechanicService,
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

    controller = module.get<MechanicController>(MechanicController);
    service = module.get<MechanicService>(MechanicService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a mechanic', async () => {
    const mechanicDto = { name: 'John', surname: 'Doe', seniority: 5, vehicleSpecialization: 'Cars' };
    const mechanic = { id: 1, ...mechanicDto };
    jest.spyOn(service, 'create').mockResolvedValue(mechanic);

    expect(await controller.create(mechanicDto)).toBe(mechanic);
  });

  it('should find all mechanics', async () => {
    const mechanic = { id: 1, name: 'John', surname: 'Doe', seniority: 5, vehicleSpecialization: 'Cars' };
    jest.spyOn(service, 'findAll').mockResolvedValue([mechanic]);

    expect(await controller.findAll()).toEqual([mechanic]);
  });

  it('should find one mechanic', async () => {
    const mechanic = { id: 1, name: 'John', surname: 'Doe', seniority: 5, vehicleSpecialization: 'Cars' };
    jest.spyOn(service, 'findOne').mockResolvedValue(mechanic);

    expect(await controller.findOne('1')).toBe(mechanic);
  });

  it('should update a mechanic', async () => {
    const mechanicDto = { name: 'Johnny' };
    const mechanic = { id: 1, name: 'Johnny', surname: 'Doe', seniority: 5, vehicleSpecialization: 'Cars' };
    jest.spyOn(service, 'update').mockResolvedValue(mechanic);

    expect(await controller.update('1', mechanicDto)).toBe(mechanic);
  });

  it('should delete a mechanic', async () => {
    jest.spyOn(service, 'remove').mockResolvedValue();

    await controller.remove('1');
    expect(service.remove).toHaveBeenCalledWith(1);
  });
});
