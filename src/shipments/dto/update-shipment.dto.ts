// update-shipment.dto.ts
import { IsNumber, IsOptional } from 'class-validator';

export class UpdateShipmentDto {
  @IsOptional()
  @IsNumber()
  weight?: number;

  @IsOptional()
  @IsNumber()
  value?: number;

  @IsOptional()
  tripId?: number;
}