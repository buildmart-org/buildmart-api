import { PrismaService } from '@core/prisma/prisma.service';
import { LoggerService } from '@core/logger/logger.service';
import { Injectable } from '@nestjs/common';
import { FileTargetType } from '@prisma/client';
import { FileDetailsDto } from './dto';
import { FILE_DETAILS_SELECT } from './selects';

@Injectable()
export class FilesService {
    constructor(
        private readonly loggerService: LoggerService,
        private readonly prismaService: PrismaService,
    ) {}

    async getEntityFile(targetId: string, targetType: FileTargetType): Promise<FileDetailsDto> {
        const file = await this.prismaService.files.findFirst({
            select: FILE_DETAILS_SELECT,
            where: {
                targetId: targetId,
                targetType: targetType,
            },
        });

        return FileDetailsDto.from(file);
    }
}
