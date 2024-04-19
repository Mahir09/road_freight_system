/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeController } from './employees.controller';
import { EmployeeService } from './employees.service';

describe('EmployeeController', () => {
  let controller: EmployeeController;
  let service: EmployeeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmployeeController],
      providers: [{
        provide: EmployeeService,
        useValue: {
          create: jest.fn(),
          findAll: jest.fn(),
          findOne: jest.fn(),
          update: jest.fn(),
          remove: jest.fn(),
        },
      }],
    }).compile();

    controller = module.get<EmployeeController>(EmployeeController);
    service = module.get<EmployeeService>(EmployeeService);
  });

  it('should create a new employee', async () => {
    const dto = { name: 'John', surname: 'Doe', seniority: 5 };
    const result = { id: 1, ...dto };

    jest.spyOn(service, 'create').mockResolvedValue(result);
    expect(await controller.create(dto)).toBe(result);
  });

  it('should get all employees', async () => {
    const result = [{ id: 1, name: 'John', surname: 'Doe', seniority: 5 }];
    jest.spyOn(service, 'findAll').mockResolvedValue(result);
    expect(await controller.findAll()).toBe(result);
  });

  it('should get one employee by id', async () => {
    const result = { id: 1, name: 'John', surname: 'Doe', seniority: 5 };
    jest.spyOn(service, 'findOne').mockResolvedValue(result);
    expect(await controller.findOne('1')).toBe(result);
  });

  it('should update an employee', async () => {
    const dto = { name: 'John Updated', surname: 'Doe', seniority: 6 };
    const result = { id: 1, ...dto };
    jest.spyOn(service, 'update').mockResolvedValue(result);
    expect(await controller.update('1', dto)).toBe(result);
  });

  it('should delete an employee', async () => {
    jest.spyOn(service, 'remove').mockResolvedValue();
    expect(await controller.remove('1')).toBeUndefined();
  });
});
