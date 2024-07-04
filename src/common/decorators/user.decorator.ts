import { ExecutionContext, HttpStatus, createParamDecorator } from "@nestjs/common";
import { CustomException } from "../exceptions/custom-exception.exception";

export const User = createParamDecorator((filter:string, context: ExecutionContext)=>{
    const req = context.switchToHttp().getRequest();
    
    if(req.user) {
        if(filter){
            return req.user[filter];
        } else {
            return req.user;
        }
    } else {
        throw new CustomException(false, "Usuário não encontrado no request", HttpStatus.NOT_FOUND);
    }    
});