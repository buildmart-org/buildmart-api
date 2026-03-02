import { IPaginationMeta } from '@common/types';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class PaginationMetaDto {
    @ApiProperty()
    @Expose()
    limit!: number;

    @ApiProperty()
    @Expose({ name: 'current_page' })
    currentPage!: number;

    @ApiProperty()
    @Expose({ name: 'last_page' })
    lastPage!: number;

    @ApiProperty()
    @Expose()
    total!: number;

    constructor(data: PaginationMetaDto) {
        Object.assign(this, data);
    }

    static from(input: IPaginationMeta): PaginationMetaDto {
        return new PaginationMetaDto({
            limit: input.limit,
            currentPage: input.currentPage,
            lastPage: input.lastPage,
            total: input.total,
        });
    }
}
