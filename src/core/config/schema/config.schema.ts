import z from 'zod';
import { AppSchema } from './app.schema';
import { DbSchema } from './db.schema';

export enum ConfigKeyEnum {
    APP = 'APP',
    DB = 'DB',
}

export enum EnvironmentKeyEnum {
    DEV = 'dev',
    PROD = 'prod',
    TEST = 'test',
}

export interface ConfigType extends Record<ConfigKeyEnum, any> {
    APP: z.infer<typeof AppSchema>;
    DB: z.infer<typeof DbSchema>;
}
