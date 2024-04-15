/* eslint-disable prettier/prettier */
import { Employee } from 'src/employees/entities/employee.entity';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Mechanic{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  surname: string;

  @Column()
  seniority: number;

  @Column()
  vehicleSpecialization: string; 
}
