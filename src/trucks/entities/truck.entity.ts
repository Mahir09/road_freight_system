/* eslint-disable prettier/prettier */
// import { Trip } from 'src/trips/entities/trip.entity';
import { Trip } from '../../trips/entities/trip.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class Truck {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  brand: string;

  @Column()
  load_capacity: number;

  @Column()
  year: number;

  @Column()
  number_of_repairs: number;

  @OneToMany(() => Trip, trip => trip.truck)
  trips: Trip[];
}
