import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { HealthcheckService } from './healthcheck.service';

@Controller('healthcheck')
export class HealthcheckController {
    constructor(private readonly healthcheckService: HealthcheckService) {}

    @Get()
    @HttpCode(HttpStatus.OK)
    healthcheck() {
        return this.healthcheckService.healthcheck();
    }
}
