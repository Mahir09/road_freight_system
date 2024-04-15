// update-trip.dto.ts
import { IsString, IsOptional, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateTripDto {
  @IsOptional()
  @IsString()
  routeFrom?: string;

  @IsOptional()
  @IsString()
  routeTo?: string;

  @IsOptional()
  truckId?: number;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Number)
  driverIds?: number[];
}