import { Body, Controller, Get, HttpException, HttpStatus, Post, Query, UseGuards } from "@nestjs/common";
import { TransactionService } from "./transaction.service";
import { CustomException } from "../../common/exceptions/custom-exception.exception";
import { ParamId } from "../../common/decorators/param-id.decorator";
import { JwtAuthGuard } from "../../common/guards/jwt.guard";
import { Roles } from "../../common/decorators/roles.decorator";
import { Role } from "../../common/enums/role.enum";
import { RoleGuard } from "../../common/guards/role.guard";
import { CheckInDTO } from "./dto/check-in.dto";

@Roles(Role.Admin)
@UseGuards(RoleGuard)
@UseGuards(JwtAuthGuard)
@Controller("transaction")
export class TransactionController {
    constructor(private readonly transactionService: TransactionService) { }

    @Post("/check-out/:id")
    async registerBook(@ParamId() id: number){
        try {
            const result = this.transactionService.registerBook(id);
            return result;
        } catch (error) {
            if (error instanceof HttpException) throw error;
            throw new CustomException(false, "Internal server error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Post("/check-in/:id")
    async returnBook(@ParamId() id: number, @Body() body: CheckInDTO){
        try {
            const result = this.transactionService.returnBook(id, body);
            return result;
        } catch (error) {
            if (error instanceof HttpException) throw error;
            throw new CustomException(false, "Internal server error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get("/list")
    async list(){
        try {
            const result = await this.transactionService.list();
            return result;
        } catch (error) {
            if (error instanceof HttpException) throw error;
            throw new CustomException(false, "Internal server error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get("/list/book/:id")
    async listBook(@ParamId() id: number) {
        try {
            const result = await this.transactionService.listBook(id);
            return result;
        } catch (error) {
            if (error instanceof HttpException) throw error;
            throw new CustomException(false, "Internal server error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get("/list/user/:id")
    async listUser(@ParamId() id: number){
        try {
            const result = await this.transactionService.listUser(id);
            return result;
        } catch (error) {
            if (error instanceof HttpException) throw error;
            throw new CustomException(false, "Internal server error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}