import * as bcrypt from "bcrypt";
import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateUserDTO } from "./dto/create-user.dto";

@Injectable()
export class UserService {
    constructor(private readonly prisma: PrismaService){}

    async create(data: CreateUserDTO){
        const salt = await bcrypt.genSalt();
        const { password, ...user } = data;
        const newPassword = await bcrypt.hash(password, salt);

        await this.prisma.users.create({
            data: {
                password: newPassword,
                ...user
            }
        });

        return true;
    }

    async list(){
        return await this.prisma.users.findMany({
            where: {
                role: "USER"
            }
        });
    }
}