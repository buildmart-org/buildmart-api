import { HttpStatus } from '@nestjs/common';
import { AppException } from './app.exception';

export class NotFoundException extends AppException {
    constructor(detail = 'Запись не найдена') {
        super(HttpStatus.NOT_FOUND, detail);
    }
}
