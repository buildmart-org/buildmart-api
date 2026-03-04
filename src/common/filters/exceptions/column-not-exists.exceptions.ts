import { HttpStatus } from '@nestjs/common';
import { AppException } from './app.exception';

export class ColumnNotExistsException extends AppException {
    constructor() {
        super(HttpStatus.CONFLICT, 'Запрашиваемая колонка не существует в текущей базе данных');
    }
}
