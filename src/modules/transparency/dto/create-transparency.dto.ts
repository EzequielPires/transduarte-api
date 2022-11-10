import { ApiProperty } from "@nestjs/swagger";

export class CreateTransparencyDto {
    @ApiProperty()
    year: number;

    @ApiProperty()
    month: number;

    @ApiProperty()
    total_trip: number;
    
    @ApiProperty()
    total_passengers: number;
    
    @ApiProperty()
    total_free: number;

    @ApiProperty()
    total_mileage: number;    

    @ApiProperty()
    file: string;
}
