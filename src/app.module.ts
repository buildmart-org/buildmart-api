import { CoreModule } from '@core/core.module';
import { ModulesModule } from '@modules/modules.module';
import { Module } from '@nestjs/common';
import { CommonModule } from './common/common.module';

@Module({
    imports: [CoreModule, ModulesModule, CommonModule],
    controllers: [],
    providers: [],
})
export class AppModule {}
