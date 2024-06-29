import { HttpException, HttpStatus } from '@nestjs/common';

export class CustomException extends HttpException {
    constructor(success: boolean, message: string, status: HttpStatus) {
        super({ success, message }, status);
    }
}