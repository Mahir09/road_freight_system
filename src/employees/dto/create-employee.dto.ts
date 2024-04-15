// create-employee.dto.ts
import { IsInt, IsString, Min } from 'class-validator';

export class CreateEmployeeDto {
  @IsString()
  name: string;

  @IsString()
  surname: string;

  @IsInt()
  @Min(0)
  seniority: number;
}