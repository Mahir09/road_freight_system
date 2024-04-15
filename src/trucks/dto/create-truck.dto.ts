/* eslint-disable prettier/prettier */
import { IsString, IsInt, IsPositive, Min, Max } from 'class-validator';

export class CreateTruckDto {
    @IsString()
    brand: string;

    @IsInt()
    @IsPositive()
    load_capacity: number;

    @IsInt()
    @Min(1900)
    @Max(new Date().getFullYear())
    year: number;

    @IsInt()
    @Min(0)
    number_of_repairs: number;
}
