import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ApplyPromocodeDto {
    @ApiProperty({ description: 'Promocode' })
    @IsNotEmpty()
    @IsString()
    promocode!: string;
}
