import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { FilesModule } from '@modules/files/files.module';

@Module({
    imports: [FilesModule],
    controllers: [ProductsController],
    providers: [ProductsService],
})
export class ProductsModule {}
