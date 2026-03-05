import { Module } from '@nestjs/common';
import { SystemSettingsService } from './system-settings.service';
import { SystemSettingsController } from './system-settings.controller';

@Module({
    providers: [SystemSettingsService],
    controllers: [SystemSettingsController],
})
export class SystemSettingsModule {}
