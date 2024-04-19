/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EmployeeService } from './employees.service';
import { Employee } from './entities/employee.entity';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';

describe('EmployeeService', () => {
  let service: EmployeeService;
  let mockRepository: jest.Mocked<Repository<Employee>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EmployeeService,
        {
          provide: getRepositoryToken(Employee),
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

    service = module.get<EmployeeService>(EmployeeService);
    mockRepository = module.get<Repository<Employee>>(getRepositoryToken(Employee)) as jest.Mocked<Repository<Employee>>;
  });

  it('should create a new employee record', async () => {
    const createDto: CreateEmployeeDto = { name: 'John', surname: 'Doe', seniority: 5 };
    const expectedEmployee: Employee = { ...createDto, id: 1 };

    mockRepository.create.mockReturnValue(expectedEmployee);
    mockRepository.save.mockResolvedValue(expectedEmployee);

    expect(await service.create(createDto)).toEqual(expectedEmployee);
    expect(mockRepository.create).toHaveBeenCalledWith(createDto);
    expect(mockRepository.save).toHaveBeenCalledWith(expectedEmployee);
  });

  it('should return all employees', async () => {
    const employeeArray: Employee[] = [
      { id: 1, name: 'John', surname: 'Doe', seniority: 5 },
      { id: 2, name: 'Jane', surname: 'Doe', seniority: 3 }
    ];

    mockRepository.find.mockResolvedValue(employeeArray);

    expect(await service.findAll()).toEqual(employeeArray);
    expect(mockRepository.find).toHaveBeenCalled();
  });

  it('should find one employee by id', async () => {
    const employee: Employee = { id: 1, name: 'John', surname: 'Doe', seniority: 5 };

    mockRepository.findOneBy.mockResolvedValue(employee);

    expect(await service.findOne(1)).toEqual(employee);
    expect(mockRepository.findOneBy).toHaveBeenCalledWith({ id: 1 });
  });

  it('should update an existing employee', async () => {
    const updateDto: UpdateEmployeeDto = { name: 'John Updated', surname: 'Doe', seniority: 6 };
    const updatedEmployee: Employee = {
        id: 1,
        name: 'John Updated',
        surname: 'Doe',
        seniority: 6
      };
      
    mockRepository.preload.mockResolvedValue(updatedEmployee);
    mockRepository.save.mockResolvedValue(updatedEmployee);

    expect(await service.update(1, updateDto)).toEqual(updatedEmployee);
    expect(mockRepository.preload).toHaveBeenCalledWith({ id: 1, ...updateDto });
    expect(mockRepository.save).toHaveBeenCalledWith(updatedEmployee);
  });

  it('should remove an employee', async () => {
    const employee: Employee = { id: 1, name: 'John', surname: 'Doe', seniority: 5 };

    mockRepository.findOneBy.mockResolvedValue(employee);
    mockRepository.remove.mockResolvedValue(undefined);

    await service.remove(1);

    expect(mockRepository.findOneBy).toHaveBeenCalledWith({ id: 1 });
    expect(mockRepository.remove).toHaveBeenCalledWith(employee);
  });
});
