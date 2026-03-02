import { NestFactory, Reflector } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { ConfigService } from './core/config/config.service';
import { EnvironmentKeyEnum } from './core/config/schema/config.schema';
import fastifyCsrf from '@fastify/csrf-protection';
import helmet from '@fastify/helmet';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { LoggerService } from './core/logger/logger.service';
import { StandardResponseInterceptor } from './common/interceptors/standard-response.interceptor';
import { HttpExceptionFilter, PrismaExceptionFilter } from '@common/filters';

async function bootstrap() {
    const logger = new LoggerService();
    const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter(), {
        logger: logger,
        cors: true,
    });

    const configService = app.get(ConfigService);

    if (configService.get('APP').NODE_ENV !== EnvironmentKeyEnum.PROD) {
        const swaggerConfig = new DocumentBuilder()
            .setTitle('REST API')
            .setDescription('Buildmart REST API')
            .setVersion('1.0.0')
            .build();

        const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
        SwaggerModule.setup('docs', app, swaggerDocument);
    }

    const reflector = app.get(Reflector);

    app.useGlobalInterceptors(
        new ClassSerializerInterceptor(reflector, {
            excludeExtraneousValues: true,
            enableImplicitConversion: true,
        }),
        new StandardResponseInterceptor(),
    );

    app.useGlobalFilters(new HttpExceptionFilter(), new PrismaExceptionFilter());

    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
            transformOptions: {
                enableImplicitConversion: true,
            },
            whitelist: true,
        }),
    );

    app.setGlobalPrefix('api/v1');

    await app.register(fastifyCsrf);
    await app.register(helmet);
    const config = configService.get('APP');

    await app.listen(config.PORT ?? 3000, '0.0.0.0');
}
void bootstrap();
