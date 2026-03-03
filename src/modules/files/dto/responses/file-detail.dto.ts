import { FileSelectType } from '@modules/files/selects';
import { ApiProperty } from '@nestjs/swagger';
import { FileTargetType } from '@prisma/client';
import { Expose } from 'class-transformer';
import { IsEnum } from 'class-validator';

export class FileDetailsDto {
    @ApiProperty()
    @Expose()
    id!: string;

    @ApiProperty()
    @Expose()
    url!: string;

    @ApiProperty({ enum: FileTargetType })
    @Expose()
    @IsEnum(() => FileTargetType)
    targetType!: FileTargetType;

    @ApiProperty()
    @Expose()
    targetId!: string;

    @ApiProperty()
    @Expose()
    createdAt!: Date;

    constructor(partial: Partial<FileDetailsDto>) {
        Object.assign(this, partial);
    }

    static from(entity: FileSelectType | null): FileDetailsDto {
        if (!entity) return new FileDetailsDto({});
        return new FileDetailsDto({
            id: entity.id,
            url: entity.url,
            targetType: entity.targetType,
            targetId: entity.targetId,
            createdAt: entity.createdAt,
        });
    }
}
