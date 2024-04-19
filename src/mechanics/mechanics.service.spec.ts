/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MechanicService } from './mechanics.service';
import { Mechanic } from './entities/mechanic.entity';

describe('MechanicService', () => {
  let service: MechanicService;
  let mockRepository: jest.Mocked<Repository<Mechanic>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MechanicService,
        {
          provide: getRepositoryToken(Mechanic),
          useFactory: repositoryMockFactory,
        },
      ],
    }).compile();

    service = module.get<MechanicService>(MechanicService);
    mockRepository = module.get(getRepositoryToken(Mechanic));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new mechanic', async () => {
    const mechanicDto = { name: 'John', surname: 'Doe', seniority: 5, vehicleSpecialization: 'Cars' };
    const mechanic = { id: 1, ...mechanicDto };
    mockRepository.create.mockReturnValue(mechanic);
    mockRepository.save.mockResolvedValue(mechanic);

    expect(await service.create(mechanicDto)).toEqual(mechanic);
    expect(mockRepository.create).toHaveBeenCalledWith(mechanicDto);
    expect(mockRepository.save).toHaveBeenCalledWith(mechanic);
  });

  it('should find all mechanics', async () => {
    const mechanic = { id: 1, name: 'John', surname: 'Doe', seniority: 5, vehicleSpecialization: 'Cars' };
    mockRepository.find.mockResolvedValue([mechanic]);
    expect(await service.findAll()).toEqual([mechanic]);
  });

  it('should find one mechanic by id', async () => {
    const mechanic = { id: 1, name: 'John', surname: 'Doe', seniority: 5, vehicleSpecialization: 'Cars' };
    mockRepository.findOneBy.mockResolvedValue(mechanic);
    expect(await service.findOne(1)).toEqual(mechanic);
  });

  it('should update a mechanic', async () => {
    const mechanicDto = { name: 'Johnny' };
    const mechanic = { id: 1, name: 'Johnny', surname: 'Doe', seniority: 5, vehicleSpecialization: 'Cars' };
    mockRepository.preload.mockResolvedValue(mechanic);
    mockRepository.save.mockResolvedValue(mechanic);

    expect(await service.update(1, mechanicDto)).toEqual(mechanic);
    expect(mockRepository.preload).toHaveBeenCalledWith({ id: 1, ...mechanicDto });
    expect(mockRepository.save).toHaveBeenCalledWith(mechanic);
  });

  it('should delete a mechanic', async () => {
    const mechanic = { id: 1, name: 'John', surname: 'Doe', seniority: 5, vehicleSpecialization: 'Cars' };
    mockRepository.findOneBy.mockResolvedValue(mechanic);
    mockRepository.remove.mockResolvedValue(mechanic);

    await service.remove(1);
    expect(mockRepository.findOneBy).toHaveBeenCalledWith({ id: 1 });
    expect(mockRepository.remove).toHaveBeenCalledWith(mechanic);
  });
});

type MockType<T> = {
  [P in keyof T]?: jest.Mock<unknown>;
};

const repositoryMockFactory: () => MockType<Repository<any>> = jest.fn(() => ({
  findOneBy: jest.fn(),
  find: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
  preload: jest.fn(),
  remove: jest.fn(),
}));
