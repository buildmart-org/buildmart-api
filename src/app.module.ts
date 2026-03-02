import { CoreModule } from '@core/core.module';
import { ModulesModule } from '@modules/modules.module';
import { Module } from '@nestjs/common';

@Module({
    imports: [CoreModule, ModulesModule],
    controllers: [],
    providers: [],
})
export class AppModule {}
