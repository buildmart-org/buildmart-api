import { Module } from '@nestjs/common';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { FilesModule } from '@modules/files/files.module';

@Module({
    imports: [FilesModule],
    controllers: [CategoriesController],
    providers: [CategoriesService],
})
export class CategoriesModule {}
