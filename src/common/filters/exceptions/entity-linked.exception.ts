import { HttpStatus } from '@nestjs/common';
import { AppException } from './app.exception';

export class EntityLinkedException extends AppException {
    constructor() {
        super(
            HttpStatus.CONFLICT,
            'Запись используется в других сущностях и не может быть удалена',
        );
    }
}
