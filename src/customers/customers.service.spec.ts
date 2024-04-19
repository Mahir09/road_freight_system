/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { CustomerService } from './customers.service';
import { Repository } from 'typeorm';
import { Customer } from './entities/customer.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('CustomerService', () => {
  let service: CustomerService;
  let mockRepository: Partial<Record<keyof Repository<Customer>, jest.Mock>>;

  beforeEach(async () => {
    mockRepository = {
      create: jest.fn(),
      save: jest.fn(),
      find: jest.fn(),
      findOneBy: jest.fn(),
      delete: jest.fn()
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CustomerService,
        {
          provide: getRepositoryToken(Customer),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<CustomerService>(CustomerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should successfully create a customer', async () => {
      const customerData: Customer = {
        id: 1,
        name: 'John Doe',
        address: '123 Main St',
        phone_number1: '1234567890',
        phone_number2: '0987654321'
      };

      mockRepository.create.mockReturnValue(customerData);
      mockRepository.save.mockResolvedValue(customerData);

      expect(await service.create(customerData)).toEqual(customerData);
      expect(mockRepository.create).toHaveBeenCalledWith(customerData);
      expect(mockRepository.save).toHaveBeenCalledWith(customerData);
    });
  });

  describe('findAll', () => {
    it('should return an array of customers', async () => {
      const customers: Customer[] = [
        { id: 1, name: 'John Doe', address: '123 Main St', phone_number1: '1234567890', phone_number2: '0987654321' },
        { id: 2, name: 'Jane Doe', address: '456 Elm St', phone_number1: '2345678901', phone_number2: null }
      ];
      mockRepository.find.mockResolvedValue(customers);

      expect(await service.findAll()).toEqual(customers);
      expect(mockRepository.find).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single customer', async () => {
      const customer: Customer = {
        id: 1,
        name: 'John Doe',
        address: '123 Main St',
        phone_number1: '1234567890',
        phone_number2: '0987654321'
      };
      mockRepository.findOneBy.mockResolvedValue(customer);

      expect(await service.findOne(1)).toEqual(customer);
      expect(mockRepository.findOneBy).toHaveBeenCalledWith({ id: 1 });
    });
  });

  describe('update', () => {
    it('should update a customer', async () => {
      const customer: Customer = {
        id: 1,
        name: 'John Doe',
        address: '123 Main St',
        phone_number1: '1234567890',
        phone_number2: '0987654321'
      };
      const updatedCustomerData: Partial<Customer> = { name: "Johnny Doe" };

      mockRepository.findOneBy.mockResolvedValue(customer);
      mockRepository.save.mockResolvedValue({ ...customer, ...updatedCustomerData });

      expect(await service.update(1, updatedCustomerData)).toEqual({ ...customer, ...updatedCustomerData });
      expect(mockRepository.findOneBy).toHaveBeenCalledWith({ id: 1 });
      expect(mockRepository.save).toHaveBeenCalledWith({ ...customer, ...updatedCustomerData });
    });
  });

  describe('remove', () => {
    it('should remove a customer', async () => {
      const result = { affected: 1 };

      mockRepository.delete.mockResolvedValue(result);

      await expect(service.remove(1)).resolves.not.toThrow();
      expect(mockRepository.delete).toHaveBeenCalledWith(1);
    });
  });
});
