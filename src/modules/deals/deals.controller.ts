import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { DealsService } from './deals.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { DealListDto } from './dto/responses/deal-list.dto';

@Controller('deals')
export class DealsController {
    constructor(private readonly dealsService: DealsService) {}

    @Get('')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Categories' })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Found categories',
        type: [DealListDto],
    })
    async findAll(): Promise<DealListDto[]> {
        return await this.dealsService.findAll();
    }
}
