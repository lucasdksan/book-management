import { ExecutionContext, HttpStatus, Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Reflector } from "@nestjs/core";
import { CustomException } from "../exceptions/custom-exception.exception";

@Injectable()
export class JwtAuthGuard extends AuthGuard("jwt") {
    constructor(private reflector: Reflector) {
        super();
    }

    canActivate(context: ExecutionContext) {
        const isPublic = this.reflector.getAllAndOverride<boolean>("IS_PUBLIC_KEY", [
            context.getHandler(),
            context.getClass(),
        ]);
        if (isPublic) return true;

        return super.canActivate(context);
    }
}