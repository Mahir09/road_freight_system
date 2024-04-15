/* eslint-disable prettier/prettier */
import { IsString, IsInt, IsPositive, Min, Max, IsOptional } from 'class-validator';

export class UpdateTruckDto {
    @IsOptional()
    @IsString()
    brand?: string;

    @IsOptional()
    @IsInt()
    @IsPositive()
    load_capacity?: number;

    @IsOptional()
    @IsInt()
    @Min(1900)
    @Max(new Date().getFullYear())
    year?: number;

    @IsOptional()
    @IsInt()
    @Min(0)
    number_of_repairs?: number;
}
