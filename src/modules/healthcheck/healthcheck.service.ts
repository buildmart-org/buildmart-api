import { Injectable } from '@nestjs/common';
import { LoggerService } from 'src/core/logger/logger.service';

@Injectable()
export class HealthcheckService {
    constructor(private readonly logger: LoggerService) {}
    healthcheck() {
        this.logger.log('Healthcheck');
        return { status: 200 };
    }
}
