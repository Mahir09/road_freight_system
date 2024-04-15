// update-mechanic.dto.ts
import { IsOptional, IsString, IsInt } from 'class-validator';

export class UpdateMechanicDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  surname?: string;

  @IsOptional()
  @IsInt()
  seniority?: number;

  @IsOptional()
  @IsString()
  vehicleSpecialization?: string;
}