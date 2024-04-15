// create-driver.dto.ts
import { IsString } from 'class-validator';

export class CreateDriverDto {
  @IsString()
  name: string;

  @IsString()
  surname: string;

  @IsString()
  drivingCategory: string;

  @IsString()
  seniority: number;
}