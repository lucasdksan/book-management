import { HttpStatus, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { CustomException } from "../exceptions/custom-exception.exception";

export class UserIdCheckMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        if(isNaN(Number(req.params.id)) || Number(req.params.id) <= 0) {
            throw new CustomException(false, "Id inválido", HttpStatus.BAD_REQUEST);
        } else {
            next();
        }
    }
}