import { Injectable } from '@nestjs/common';
import { DealListDto } from './dto/responses/deal-list.dto';
import { PrismaService } from '@core/prisma/prisma.service';
import { LoggerService } from '@core/logger/logger.service';
import { DEAL_LIST_SELECT } from './selects/deal.select';
import { FilesService } from '@modules/files/files.service';
import { FileTargetType } from '@prisma/client';

@Injectable()
export class DealsService {
    constructor(
        private readonly prismaService: PrismaService,
        private readonly loggerService: LoggerService,
        private readonly filesService: FilesService,
    ) {}

    async findAll(): Promise<DealListDto[]> {
        this.loggerService.log(`Find all deals`);

        const deals = await this.prismaService.deal.findMany({
            select: DEAL_LIST_SELECT,
        });
        console.log(deals);

        const productIds = deals.flatMap((deal) => deal.products.map((p) => p.id));

        const files = await this.filesService.getEntitiesFiles(productIds, FileTargetType.PRODUCT);

        return DealListDto.fromEntity(deals, files);
    }
}
