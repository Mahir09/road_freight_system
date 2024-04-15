/* eslint-disable prettier/prettier */
// trip.entity.ts
import { Driver } from 'src/drivers/entities/driver.entity';
import { Shipment } from 'src/shipments/entities/shipment.entity';
import { Truck } from 'src/trucks/entities/truck.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable, OneToMany } from 'typeorm';

@Entity()
export class Trip {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  routeFrom: string;

  @Column()
  routeTo: string;

  @ManyToOne(() => Truck, truck => truck.trips) 
  truck: Truck;

  @ManyToMany(() => Driver)
  @JoinTable()
  drivers: Driver[];

  @OneToMany(() => Shipment, shipment => shipment.trip)
  shipments: Shipment[];
}
