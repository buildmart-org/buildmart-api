import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsEmail, IsOptional, IsUUID, IsNumber, Min } from 'class-validator';

export class CreateOrderItemDto {
    @ApiProperty({ description: 'Product ID' })
    @IsUUID()
    productId!: string;

    @ApiProperty({ description: 'Quantity' })
    @IsNumber()
    @Min(1)
    quantity!: number;
}

export class CreateOrderDto {
    @ApiProperty({ description: 'Email for guest user' })
    @IsEmail()
    email!: string;

    @ApiProperty({ description: 'User ID if logged in', required: false })
    @IsOptional()
    @IsUUID()
    userId?: string;

    @ApiProperty({ description: 'List of items in the order', type: [CreateOrderItemDto] })
    @IsArray()
    items!: CreateOrderItemDto[];

    @ApiProperty({ description: 'Promocode if provided', required: false })
    @IsOptional()
    promocode?: string;
}
