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

    async getEntityFiles(targetId: string, targetType: FileTargetType): Promise<FileDetailsDto[]> {
        this.loggerService.log('Getting entity file');

        const files = await this.prismaService.files.findMany({
            select: FILE_SELECT,
            where: {
                targetId: targetId,
                targetType: targetType,
            },
            orderBy: {
                isPrimary: 'desc',
            },
        });

        return FileListDto.fromEntity(files);
    }
    //
    // async getEntityFile(targetId: string, targetType: FileTargetType): Promise<FileDetailsDto> {
    //     this.loggerService.log('Getting entity file');
    //
    //     const file = await this.prismaService.files.findFirst({
    //         select: FILE_SELECT,
    //         where: {
    //             isPrimary: true,
    //             targetId: targetId,
    //             targetType: targetType,
    //         },
    //     });
    //
    //     return FileDetailsDto.fromEntity(file);
    // }

    async getEntitiesFiles(
        targetsIds: string[],
        targetType: FileTargetType,
    ): Promise<Map<string, FileListDto[]>> {
        this.loggerService.log('Getting entities files');

        const files = await this.prismaService.files.findMany({
            select: FILE_SELECT,
            where: {
                targetId: {
                    in: targetsIds,
                },
                targetType: targetType,
            },
            orderBy: {
                isPrimary: 'desc',
            },
        });

        const filesDto = FileListDto.fromEntity(files);

        return this.groupFilesByTargetId(filesDto);
    }

    private groupFilesByTargetId(files: FileListDto[]): Map<string, FileListDto[]> {
        const map = new Map<string, FileListDto[]>();

        for (const file of files) {
            const list = map.get(file.targetId) ?? [];

            list.push(file);
            map.set(file.targetId, list);
        }

        return map;
    }
}
