import z from 'zod';

export const DbSchema = z.object({
    POSTGRES_PORT: z.coerce.number().default(5432),
    POSTGRES_HOSTNAME: z.string().default('localhost'),
    POSTGRES_USER: z.string().default('postgres'),
    POSTGRES_PASSWORD: z.string().default('postgres'),
    POSTGRES_DB: z.string().default('db'),
    DATABASE_URL: z.string(),
});
