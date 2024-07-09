import { Body, Controller, HttpException, HttpStatus, Post } from "@nestjs/common";
import { TransactionService } from "./transaction.service";
import { CreateTransactionDTO } from "./dto/create-transaction.dto";
import { CustomException } from "../../common/exceptions/custom-exception.exception";

@Controller("transaction")
export class TransactionController {
    constructor(private readonly transactionService: TransactionService) { }

    @Post("check-out")
    async create(@Body() body:CreateTransactionDTO){
        try {

        } catch (error) {
            if (error instanceof HttpException) throw error;
            throw new CustomException(false, "Internal server error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}