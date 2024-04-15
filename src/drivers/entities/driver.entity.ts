/* eslint-disable prettier/prettier */
import { Employee } from 'src/employees/entities/employee.entity'; 
import { Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class Driver {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  surname: string;

  @Column()
  seniority: number;

  @Column()
  drivingCategory: string;
}
