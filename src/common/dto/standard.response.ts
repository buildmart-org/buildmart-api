import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsOptional } from 'class-validator';

export class StandardResponseDTO<T, M = unknown> {
    @Expose()
    @ApiProperty()
    data!: T | T[];

    @Expose()
    @IsOptional()
    @ApiProperty({ required: false })
    meta?: M;

    constructor(payload: { data: T | T[]; meta?: M }) {
        Object.assign(this, payload);
    }

    static from<T, M>(data: T | T[], meta?: M): StandardResponseDTO<T> {
        return new StandardResponseDTO({
            data,
            meta,
        });
    }
}
