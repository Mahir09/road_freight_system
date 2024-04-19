/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { CustomerService } from '../src/customers/customers.service';
import { CustomersModule } from '../src/customers/customers.module';
import { DataSource, DataSourceOptions } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppModule } from 'src/app.module';
import { Customer } from 'src/customers/entities/customer.entity';

describe('CustomerController (integration)', () => {
    let app: INestApplication;
    let customerService: CustomerService;
    let dataSource: DataSource;
  
    beforeEach(async () => {
        const typeOrmConfig: DataSourceOptions = {
          type: 'postgres',
          host: 'localhost',
          port: 5432,
          username: 'postgres',
          password: 'root',
          database: 'road_freight_db',
          entities: [Customer],
          synchronize: true,
        };
    
        const moduleFixture: TestingModule = await Test.createTestingModule({
          imports: [
            CustomersModule,
            TypeOrmModule.forRoot(typeOrmConfig),
          ],
        }).compile();
    
        app = moduleFixture.createNestApplication();
        await app.init();
        customerService = moduleFixture.get<CustomerService>(CustomerService);
        dataSource = moduleFixture.get<DataSource>(DataSource);
      });
  
    afterEach(async () => {
      await app.close();
    });

  afterEach(async () => {
    await app.close();
  });

  describe('create', () => {
    it('should create a new customer', async () => {
      const customerData = {
        name: 'John Doe',
        address: '123 Main St',
        phone_number1: '555-1234',
        phone_number2: '555-5678',
      };

      const response = await request(app.getHttpServer())
        .post('/customers')
        .send(customerData)
        .expect(201);

      expect(response.body).toMatchObject(customerData);
    });
  });

  describe('findAll', () => {
    it('should return all customers', async () => {
      await customerService.create({
        name: 'John Doe',
        address: '123 Main St',
        phone_number1: '555-1234',
        phone_number2: '555-5678',
      });

      const response = await request(app.getHttpServer())
        .get('/customers')
        .expect(200);

      expect(response.body.length).toBeGreaterThan(0);
    });
  });

  describe('findOne', () => {
    it('should return a single customer', async () => {
      const customer = await customerService.create({
        name: 'John Doe',
        address: '123 Main St',
        phone_number1: '555-1234',
        phone_number2: '555-5678',
      });

      const response = await request(app.getHttpServer())
        .get(`/customers/${customer.id}`)
        .expect(200);

      expect(response.body).toMatchObject({
        id: customer.id,
        name: 'John Doe',
        address: '123 Main St',
        phone_number1: '555-1234',
        phone_number2: '555-5678',
      });
    });
  });

  describe('update', () => {
    it('should update an existing customer', async () => {
      const customer = await customerService.create({
        name: 'John Doe',
        address: '123 Main St',
        phone_number1: '555-1234',
        phone_number2: '555-5678',
      });

      const updatedCustomerData = {
        name: 'Jane Doe',
        address: '456 Oak Rd',
        phone_number1: '555-9012',
        phone_number2: '555-3456',
      };

      const response = await request(app.getHttpServer())
        .put(`/customers/${customer.id}`)
        .send(updatedCustomerData)
        .expect(200);

      expect(response.body).toMatchObject(updatedCustomerData);
    });
  });

  describe('remove', () => {
    it('should delete an existing customer', async () => {
      const customer = await customerService.create({
        name: 'John Doe',
        address: '123 Main St',
        phone_number1: '555-1234',
        phone_number2: '555-5678',
      });

      await request(app.getHttpServer())
        .delete(`/customers/${customer.id}`)
        .expect(200);

      const deletedCustomer = await customerService.findOne(customer.id);
      expect(deletedCustomer).toBeUndefined();
    });
  });
});