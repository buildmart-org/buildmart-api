import { Injectable } from '@nestjs/common';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';
import { ConfigService } from 'src/core/config/config.service';

@Injectable()
export class PrismaService extends PrismaClient {
    constructor(configService: ConfigService) {
        const db = configService.get('DB');

        const adapter = new PrismaPg({
            connectionString: db.DATABASE_URL,
        });

        super({ adapter });
    }
}
