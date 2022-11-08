import { ApiProperty } from "@nestjs/swagger";

export class CreateOpeningHourDto {
    @ApiProperty()
    day: string;

    @ApiProperty()
    start: string;

    @ApiProperty()
    end: string;
}
