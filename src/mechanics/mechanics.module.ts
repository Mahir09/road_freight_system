import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Mechanic } from './entities/mechanic.entity';
import { MechanicController } from './mechanics.controller';
import { MechanicService } from './mechanics.service';

@Module({
  imports: [TypeOrmModule.forFeature([Mechanic])],
  controllers: [MechanicController],
  providers: [MechanicService],
})
export class MechanicsModule {}
