// create-shipment.dto.ts
import { IsNumber, IsNotEmpty } from 'class-validator';

export class CreateShipmentDto {
  @IsNumber()
  @IsNotEmpty()
  weight: number;

  @IsNumber()
  @IsNotEmpty()
  value: number;

  @IsNotEmpty()
  tripId: number;
}