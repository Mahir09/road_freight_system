import { Module } from '@nestjs/common';
import { ShipmentController } from './shipments.controller';
import { ShipmentService } from './shipments.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Shipment } from './entities/shipment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Shipment])],
  controllers: [ShipmentController],
  providers: [ShipmentService],
})
export class ShipmentsModule {}
