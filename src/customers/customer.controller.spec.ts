/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { CustomerController } from './customers.controller';
import { CustomerService } from './customers.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

describe('CustomerController', () => {
  let controller: CustomerController;
  let service: CustomerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomerController],
      providers: [
        {
          provide: CustomerService,
          useValue: {
            create: jest.fn().mockResolvedValue({ id: 1, name: 'John Doe', address: '123 Main St', phone_number1: '1234567890' }),
            findAll: jest.fn().mockResolvedValue([
              { id: 1, name: 'John Doe', address: '123 Main St', phone_number1: '1234567890' },
              { id: 2, name: 'Jane Doe', address: '124 Main St', phone_number1: '0987654321' }
            ]),
            findOne: jest.fn().mockImplementation((id: number) => Promise.resolve({
              id, name: 'John Doe', address: '123 Main St', phone_number1: '1234567890'
            })),
            update: jest.fn().mockImplementation((id: number, dto: UpdateCustomerDto) => Promise.resolve({
              id, ...dto
            })),
            remove: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
    }).compile();

    controller = module.get<CustomerController>(CustomerController);
    service = module.get<CustomerService>(CustomerService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a customer', async () => {
    const dto: CreateCustomerDto = { name: 'John Doe', address: '123 Main St', phone_number1: '1234567890' };
    await expect(controller.create(dto)).resolves.toEqual({
      id: 1,
      ...dto,
    });
    expect(service.create).toHaveBeenCalledWith(dto);
  });

  it('should return all customers', async () => {
    await expect(controller.findAll()).resolves.toEqual([
      { id: 1, name: 'John Doe', address: '123 Main St', phone_number1: '1234567890' },
      { id: 2, name: 'Jane Doe', address: '124 Main St', phone_number1: '0987654321' }
    ]);
    expect(service.findAll).toHaveBeenCalled();
  });

  it('should find one customer by id', async () => {
    const id = 1;
    await expect(controller.findOne(id.toString())).resolves.toEqual({
      id,
      name: 'John Doe',
      address: '123 Main St',
      phone_number1: '1234567890'
    });
    expect(service.findOne).toHaveBeenCalledWith(id);
  });

  it('should update a customer', async () => {
    const id = 1;
    const dto: UpdateCustomerDto = { name: 'Johnny Doe' };
    await expect(controller.update(id.toString(), dto)).resolves.toEqual({
      id,
      ...dto
    });
    expect(service.update).toHaveBeenCalledWith(id, dto);
  });

  it('should remove a customer', async () => {
    const id = 1;
    await expect(controller.remove(id.toString())).resolves.toBeUndefined();
    expect(service.remove).toHaveBeenCalledWith(id);
  });
});
