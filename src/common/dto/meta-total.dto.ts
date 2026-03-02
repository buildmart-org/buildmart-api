import { ApiProperty } from '@nestjs/swagger';

export class MetaTotalDto {
    @ApiProperty({ description: 'Общее количество' })
    total!: number;
}
