import { Module } from '@nestjs/common';
import { HealthcheckModule } from './healthcheck/healthcheck.module';
import { CategoriesModule } from './categories/categories.module';
import { FilesModule } from './files/files.module';
import { ProductsModule } from './products/products.module';
import { DealsModule } from './deals/deals.module';

@Module({
    imports: [HealthcheckModule, FilesModule, CategoriesModule, ProductsModule, DealsModule],
})
export class ModulesModule {}
