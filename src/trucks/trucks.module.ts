/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Truck } from './entities/truck.entity';
import { TruckService } from './trucks.service';
import { TruckController } from './trucks.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Truck])],
    providers: [TruckService],
    controllers: [TruckController]
})
export class TruckModule {}
