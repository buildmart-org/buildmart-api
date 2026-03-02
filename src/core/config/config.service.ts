import { Injectable } from '@nestjs/common';

import { ConfigService as NestConfigService } from '@nestjs/config';
import { AppSchema } from './schema/app.schema';
import { DbSchema } from './schema/db.schema';
import { ConfigType } from './schema/config.schema';

@Injectable()
export class ConfigService {
    private config: ConfigType;

    constructor(private nestConfigService: NestConfigService) {
        this.config = {
            APP: AppSchema.parse({
                NODE_ENV: this.nestConfigService.get<string>('NODE_ENV'),
                PORT: this.nestConfigService.get<number>('PORT'),
                API_ORIGIN_URL: this.nestConfigService.get<string>('API_ORIGIN_URL'),
            }),
            DB: DbSchema.parse({
                POSTGRES_DB: this.nestConfigService.get<string>('POSTGRES_DB'),
                POSTGRES_HOSTNAME: this.nestConfigService.get<string>('POSTGRES_HOSTNAME'),
                POSTGRES_PORT: this.nestConfigService.get<number>('POSTGRES_PORT'),
                POSTGRES_USER: this.nestConfigService.get<string>('POSTGRES_USER'),
                POSTGRES_PASSWORD: this.nestConfigService.get<string>('POSTGRES_PASSWORD'),
                DATABASE_URL: this.nestConfigService.get<string>('DATABASE_URL'),
            }),
        };
    }

    public get<K extends keyof ConfigType>(key: K) {
        return this.config[key];
    }
}
