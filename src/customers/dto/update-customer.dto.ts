// update-customer.dto.ts
import { IsOptional, IsPhoneNumber, IsString } from 'class-validator';

export class UpdateCustomerDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsPhoneNumber()
  phone_number1?: string;

  @IsOptional()
  @IsPhoneNumber()
  phone_number2?: string;
}
