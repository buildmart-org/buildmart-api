import { Module } from '@nestjs/common';
import { HealthcheckModule } from './healthcheck/healthcheck.module';
import { CategoriesModule } from './categories/categories.module';
import { FilesModule } from './files/files.module';
import { ProductsModule } from './products/products.module';
import { DealsModule } from './deals/deals.module';
import { SystemSettingsModule } from './system-settings/system-settings.module';
import { OrdersModule } from './orders/orders.module';

@Module({
    imports: [
        HealthcheckModule,
        FilesModule,
        CategoriesModule,
        ProductsModule,
        DealsModule,
        SystemSettingsModule,
        OrdersModule,
    ],
})
export class ModulesModule {}
