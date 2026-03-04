import { Global, Module } from '@nestjs/common';
import { LoggerModule } from './logger/logger.module';
import { ConfigModule } from './config/config.module';
import { PrismaModule } from './prisma/prisma.module';

@Global()
@Module({
    imports: [ConfigModule, LoggerModule, PrismaModule],
    exports: [ConfigModule, LoggerModule, PrismaModule],
})
export class CoreModule {}
