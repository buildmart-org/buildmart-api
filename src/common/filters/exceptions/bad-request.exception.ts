import { HttpStatus } from '@nestjs/common';
import { AppException } from './app.exception';

export class BadRequestException extends AppException {
    constructor(detail = 'Некорректные данные') {
        super(HttpStatus.BAD_REQUEST, detail);
    }
}
