import { Controller, Get, HttpCode, HttpStatus, Param } from '@nestjs/common';
import { SystemSettingsService } from './system-settings.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { SystemSettingDto } from './dto';

@Controller('system-settings')
export class SystemSettingsController {
    constructor(private readonly systemSettingsService: SystemSettingsService) {}
    @Get('')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Получение системной настройки по ключу' })
    @ApiResponse({
        status: 200,
        description: 'Настройка получена',
        type: [SystemSettingDto],
    })
    async findAll(): Promise<Record<string, SystemSettingDto>> {
        return await this.systemSettingsService.findAll();
    }

    @Get(':key')
    @ApiOperation({ summary: 'Получение системной настройки по ключу' })
    @ApiResponse({
        status: 200,
        type: SystemSettingDto,
    })
    async findByKey(@Param('key') key: string): Promise<SystemSettingDto | null> {
        return this.systemSettingsService.findByKey(key);
    }
}
