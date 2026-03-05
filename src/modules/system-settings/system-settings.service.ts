import { Injectable } from '@nestjs/common';
import { SystemSettingDto } from './dto';
import { LoggerService } from '@core/logger/logger.service';
import { PrismaService } from '@core/prisma/prisma.service';
import { SYSTEM_SETTING_SELECT } from './selects';

@Injectable()
export class SystemSettingsService {
    constructor(
        private readonly loggerService: LoggerService,
        private readonly prismaService: PrismaService,
    ) {}
    async findAll(): Promise<Record<string, SystemSettingDto>> {
        this.loggerService.log(`Find all system settings`);

        const settings = await this.prismaService.systemSettings.findMany({
            select: SYSTEM_SETTING_SELECT,
        });

        return settings.reduce<Record<string, SystemSettingDto>>((acc, setting) => {
            acc[setting.key] = SystemSettingDto.fromEntity(setting);
            return acc;
        }, {});
    }

    async findByKey(key: string): Promise<SystemSettingDto | null> {
        this.loggerService.log(`Find system setting by key: ${key}`);

        const setting = await this.prismaService.systemSettings.findFirst({
            where: { key },
            select: SYSTEM_SETTING_SELECT,
        });

        if (!setting) {
            return null;
        }

        return SystemSettingDto.fromEntity(setting);
    }
}
