/* eslint-disable prettier/prettier */
import { Trip } from 'src/trips/entities/trip.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class Shipment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  weight: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  value: number;

  @ManyToOne(() => Trip, trip => trip.shipments)
  trip: Trip;
}
