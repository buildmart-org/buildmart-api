import { Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { EntityLinkedException } from './exceptions/entity-linked.exception';
import { AppException } from './exceptions/app.exception';
import { NotFoundException } from './exceptions/not-found.exception';

@Catch(
    Prisma.PrismaClientKnownRequestError,
    Prisma.PrismaClientValidationError,
    Prisma.PrismaClientUnknownRequestError,
)
export class PrismaExceptionFilter implements ExceptionFilter {
    catch(exception: unknown) {
        // Обработка известных ошибок Prisma
        if (exception instanceof Prisma.PrismaClientKnownRequestError) {
            switch (exception.code) {
                // Ошибка внешнего ключа
                case 'P2003':
                    throw new EntityLinkedException();

                // Запись не найдена
                case 'P2025':
                    throw new NotFoundException();

                // Нарушение уникальности
                case 'P2002':
                    throw new AppException(HttpStatus.CONFLICT, 'Record already exists');

                default:
                    throw new AppException(
                        HttpStatus.INTERNAL_SERVER_ERROR,
                        `Prisma Error: ${exception.code}`,
                    );
            }
        }

        // Ошибки валидации
        if (exception instanceof Prisma.PrismaClientValidationError) {
            throw new AppException(HttpStatus.BAD_REQUEST, 'Validation failed');
        }

        // Любые другие ошибки
        if (exception instanceof Prisma.PrismaClientUnknownRequestError) {
            throw new AppException(HttpStatus.INTERNAL_SERVER_ERROR, exception.message);
        }

        throw exception;
    }
}
