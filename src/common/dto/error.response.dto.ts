import { IError } from '@common/types';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsOptional } from 'class-validator';

export class ErrorResponseDto {
    @Expose()
    @ApiProperty()
    message!: string;

    @ApiProperty()
    @IsOptional()
    detail?: '';

    constructor(data: IError) {
        Object.assign(this, data);
    }

    static from(error: IError): ErrorResponseDto {
        return new ErrorResponseDto({
            message: error.message,
            detail: error.detail,
        });
    }
}
