import { FileSelectType } from '@modules/files/selects';
import { ApiProperty } from '@nestjs/swagger';
import { FileTargetType } from '@prisma/client';
import { Expose } from 'class-transformer';
import { IsEnum } from 'class-validator';

export class FileListDto {
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

    constructor(partial: Partial<FileListDto>) {
        Object.assign(this, partial);
    }

    static fromEntity(entity: FileSelectType[]): FileListDto[] {
        return entity.map(
            (entity) =>
                new FileListDto({
                    id: entity.id,
                    url: entity.url,
                    targetType: entity.targetType,
                    targetId: entity.targetId,
                    createdAt: entity.createdAt,
                }),
        );
    }
}
