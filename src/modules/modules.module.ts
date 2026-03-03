import { Module } from '@nestjs/common';
import { HealthcheckModule } from './healthcheck/healthcheck.module';
import { CategoriesModule } from './categories/categories.module';
import { FilesModule } from './files/files.module';

@Module({ imports: [HealthcheckModule, FilesModule, CategoriesModule] })
export class ModulesModule {}
