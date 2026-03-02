import { HttpException, HttpStatus } from '@nestjs/common';

export class AppException extends HttpException {
    constructor(status: HttpStatus, detail: string) {
        super({ detail }, status);
    }
}
