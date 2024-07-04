import { ExecutionContext, NotFoundException, createParamDecorator } from "@nestjs/common";

export const User = createParamDecorator((filter:string, context: ExecutionContext)=>{
    const req = context.switchToHttp().getRequest();

    if(req.user) {
        if(filter){
            return req.user[filter];
        } else {
            return req.user;
        }
    } else {
        throw new NotFoundException("Usuário não encontrado no request");
    }    
});