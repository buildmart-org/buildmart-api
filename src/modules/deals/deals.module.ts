import { Module } from '@nestjs/common';
import { DealsController } from './deals.controller';
import { DealsService } from './deals.service';
import { FilesModule } from '@modules/files/files.module';

@Module({
    imports: [FilesModule],
    controllers: [DealsController],
    providers: [DealsService],
})
export class DealsModule {}
