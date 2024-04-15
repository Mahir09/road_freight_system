// update-driver.dto.ts
import { IsOptional, IsString } from 'class-validator';

export class UpdateDriverDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  surname?: string;

  @IsOptional()
  @IsString()
  drivingCategory?: string;

  @IsOptional()
  @IsString()
  seniority?: number;
}