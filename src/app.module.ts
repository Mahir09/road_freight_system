/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { TruckModule } from './trucks/trucks.module';
import { join } from 'path';
import { CustomersModule } from './customers/customers.module';
import { EmployeesModule } from './employees/employees.module';
import { MechanicsModule } from './mechanics/mechanics.module';
import { ShipmentsModule } from './shipments/shipments.module';
import { TripsModule } from './trips/trips.module';
import { DriversModule } from './drivers/drivers.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Truck } from './trucks/entities/truck.entity';
import { Customer } from './customers/entities/customer.entity';
import { Driver } from './drivers/entities/driver.entity';
import { Employee } from './employees/entities/employee.entity';
import { Mechanic } from './mechanics/entities/mechanic.entity';
import { Shipment } from './shipments/entities/shipment.entity';
import { Trip } from './trips/entities/trip.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      useFactory: () => {
        return {
        type: 'postgres',
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT, 10),
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        entities: [Truck, Customer, Driver, Employee, Mechanic, Shipment, Trip],
        // entities: [join(process.cwd(), 'dist/**/*.entity{.ts,.js}')],
        // entities: [__dirname + '/../entities/**/*.entity{.ts,.js}'],
        // migrations: [__dirname + '/../migrations/*.ts'],
        logger: 'advanced-console',
        logging: true,
        synchronize: true,
        // cli: {
        //   migrationsDir: 'src/migrations',
        // }
      }},
    }),
    TruckModule,
    CustomersModule,
    DriversModule,
    EmployeesModule,
    MechanicsModule,
    ShipmentsModule,
    TripsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})


export class AppModule { }
