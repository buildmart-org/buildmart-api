import { PrismaService } from '@core/prisma/prisma.service';
import { LoggerService } from '@core/logger/logger.service';
import { Injectable } from '@nestjs/common';
import { FileTargetType } from '@prisma/client';
import { FILE_SELECT } from './selects';
import { FileDetailsDto, FileListDto } from './dto';

@Injectable()
export class FilesService {
    constructor(
        private readonly loggerService: LoggerService,
        private readonly prismaService: PrismaService,
    ) {}

    async getEntityFile(targetId: string, targetType: FileTargetType): Promise<FileDetailsDto> {
        this.loggerService.log('Getting entity file');

        const file = await this.prismaService.files.findFirst({
            select: FILE_SELECT,
            where: {
                targetId: targetId,
                targetType: targetType,
            },
        });

        return FileDetailsDto.fromEntity(file);
    }

    async getEntitiesFiles(
        targetsIds: string[],
        targetType: FileTargetType,
    ): Promise<FileListDto[]> {
        this.loggerService.log('Getting entities files');

        const files = await this.prismaService.files.findMany({
            select: FILE_SELECT,
            where: {
                targetId: {
                    in: targetsIds,
                },
                targetType: targetType,
            },
        });

        return FileListDto.fromEntity(files);
    }
}
