import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from './entities/customer.entity';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
  ) {}

  create(customerData: Partial<Customer>): Promise<Customer> {
    const newCustomer = this.customerRepository.create(customerData); 
    return this.customerRepository.save(newCustomer);
  }

  findAll(): Promise<Customer[]> {
    return this.customerRepository.find();
  }

  findOne(id: number): Promise<Customer> {
    return this.customerRepository.findOneBy({ id });
  }

  async update(id: number, customer: Partial<Customer>): Promise<Customer> {
    const existingCustomer = await this.customerRepository.findOneBy({ id });
    if (!existingCustomer) {
      throw new Error('Customer not found');
    }
    return this.customerRepository.save({ ...existingCustomer, ...customer });
  }

  async remove(id: number): Promise<void> {
    const result = await this.customerRepository.delete(id);
    if (result.affected === 0) {
      throw new Error('Customer not found');
    }
  }
}
