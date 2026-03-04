import { PaginationQueryDto } from '@common/dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString, IsUUID, Matches } from 'class-validator';

export class ProductListQueryDto extends PaginationQueryDto {
    @ApiPropertyOptional({
        description: 'Сортировка в формате field:direction (например: price:asc)',
        example: 'price:asc',
        pattern: '^(price):(asc|desc)$',
    })
    @IsOptional()
    @IsString()
    @Matches(/^(price|title):(asc|desc)$/i, {
        message:
            'sort должен быть в формате field:direction, где field - price, direction - asc или desc',
    })
    sort?: string;

    @ApiPropertyOptional({
        description: 'Фильтр по ID категории category.id',
        example: 'c1b2d3e4-1234-5678-9012-abcdefabcdef',
    })
    @IsOptional()
    @IsUUID()
    category?: string;

    @ApiPropertyOptional({
        description: 'Фильтр по цене (От)',
    })
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    priceFrom?: number;

    @ApiPropertyOptional({
        description: 'Фильтр по цене (До)',
    })
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    priceTo?: number;

    @ApiPropertyOptional({
        description: 'Поиск по названию',
    })
    @IsOptional()
    @IsString()
    search?: string;

    @ApiPropertyOptional({
        description: 'Фильтр по рейтингу',
    })
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    rating?: number;
}
