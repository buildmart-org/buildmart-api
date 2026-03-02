import z from 'zod';
import { EnvironmentKeyEnum } from './config.schema';

export const AppSchema = z.object({
    NODE_ENV: z.enum([...Object.values(EnvironmentKeyEnum)]),
    API_ORIGIN_URL: z.string(),
    PORT: z.coerce.number().default(3000),
});
