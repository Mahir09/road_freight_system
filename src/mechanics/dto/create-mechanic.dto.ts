// create-mechanic.dto.ts
import { IsString, IsInt } from 'class-validator';

export class CreateMechanicDto {
  @IsString()
  name: string;

  @IsString()
  surname: string;

  @IsInt()
  seniority: number;

  @IsString()
  vehicleSpecialization: string;
}