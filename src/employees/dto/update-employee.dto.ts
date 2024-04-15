// update-employee.dto.ts
import { IsInt, IsOptional, IsString, Min } from 'class-validator';

export class UpdateEmployeeDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  surname?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  seniority?: number;
}