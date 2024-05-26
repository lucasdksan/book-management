import * as bcrypt from "bcrypt";
import { Injectable } from "@nestjs/common";
import { Role as PrismaRole } from "@prisma/client";
import { PrismaService } from "../../prisma/prisma.service";
import { CreateUserDTO } from "./dto/create-user.dto";
import { ViewUserDTO } from "./dto/view-user.dto";
import { Role } from "../../common/enums/role.enums";

@Injectable()
export class UserService {
    constructor(private readonly prisma: PrismaService) { }

    private convertPrismaRoleToRole(prismaRole: PrismaRole): Role {
        if(prismaRole === "ADMIN") {
            return Role.Admin
        } else {
            return Role.User
        }
    }

    async create(data: CreateUserDTO) {
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

    async list() {
        const users = await this.prisma.users.findMany({
            where: {
                role: "USER"
            }
        });

        if (!users) {
            throw new Error("");
        }

        const viewUsersDTO = users.map((user)=> {
            let viewUserDTO: ViewUserDTO = {
                email: user.email,
                name: user.name,
                createdAt: user.created_at.toISOString(),
                birth_at: user.birth_at?.toISOString(),
                penaltyEndDate: user.penalty_end_date?.toISOString(),
                role: this.convertPrismaRoleToRole(user.role)
            };

            return viewUserDTO;
        });

        return viewUsersDTO;
    }

    async show(id: number) {
        const user = await this.prisma.users.findUnique({
            where: {
                id
            }
        });

        if (!user) {
            throw new Error("");
        }

        const viewUserDTO: ViewUserDTO = {
            email: user.email,
            name: user.name,
            createdAt: user.created_at.toISOString(),
            birth_at: user.birth_at?.toISOString(),
            penaltyEndDate: user.penalty_end_date?.toISOString(),
            role: this.convertPrismaRoleToRole(user.role)
        }

        return viewUserDTO;
    }
}