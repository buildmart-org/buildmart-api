import { CoreModule } from '@core/core.module';
import { ModulesModule } from '@modules/modules.module';
import { Module } from '@nestjs/common';
import { CommonModule } from './common/common.module';
import { FilesModule } from './modules/files/files.module';

@Module({
    imports: [CoreModule, ModulesModule, CommonModule, FilesModule],
    controllers: [],
    providers: [],
})
export class AppModule {}
