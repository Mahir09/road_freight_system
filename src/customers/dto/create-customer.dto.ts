// create-customer.dto.ts
import { IsNotEmpty, IsOptional, IsPhoneNumber, IsString } from 'class-validator';

export class CreateCustomerDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsPhoneNumber()
  phone_number1: string;

  @IsOptional()
  @IsPhoneNumber()
  phone_number2?: string;
}
