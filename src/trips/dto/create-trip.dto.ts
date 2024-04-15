// create-trip.dto.ts
import { IsString, IsNotEmpty, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateTripDto {
  @IsString()
  @IsNotEmpty()
  routeFrom: string;

  @IsString()
  @IsNotEmpty()
  routeTo: string;

  @IsNotEmpty()
  truckId: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Number)
  driverIds: number[];
}