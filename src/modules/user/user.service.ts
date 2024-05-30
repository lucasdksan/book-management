import * as bcrypt from "bcrypt";
import { Injectable } from "@nestjs/common";
import { Role as PrismaRole } from "@prisma/client";
import { PrismaService } from "../../prisma/prisma.service";
import { CreateUserDTO } from "./dto/create-user.dto";
import { ViewUserDTO } from "./dto/view-user.dto";
import { Role } from "../../common/enums/role.enums";
import { UpdatePutUserDTO } from "./dto/update-put-user.dto";
import { ExistUserError } from "../../common/errors";
import { UpdatePatchUserDTO } from "./dto/update-patch-user.dto";

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

    private async existUser(email: string) {
        const user = await this.prisma.users.findUnique({
            where: {
                email
            }
        });

        if(!user) return false;

        return true;
    }

    async create(data: CreateUserDTO) {
        const salt = await bcrypt.genSalt();
        const { password, ...user } = data;
        const newPassword = await bcrypt.hash(password, salt);

        const existUser = await this.existUser(user.email);

        if(existUser) {
            const existUserError = new ExistUserError({ name: "User exist!" });

            throw existUserError;
        }

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
                id: user.id,
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
            id: user.id,
            email: user.email,
            name: user.name,
            createdAt: user.created_at.toISOString(),
            birth_at: user.birth_at?.toISOString(),
            penaltyEndDate: user.penalty_end_date?.toISOString(),
            role: this.convertPrismaRoleToRole(user.role)
        }

        return viewUserDTO;
    }

    async update(data: UpdatePutUserDTO ,id: number) {
        const updateUser = await this.prisma.users.update({
            where: { id },
            data
        });

        if(!updateUser) throw new Error("");

        return true;
    }

    async updatePatch(data: UpdatePatchUserDTO, id: number) {
        const updateUser = await this.prisma.users.update({
            where: { id },
            data
        });

        if(!updateUser) throw new Error("");

        return true;
    }

    async delete(id: number) {
        const deleteUser = await this.prisma.users.delete({
            where: {
                id
            }
        });

        if(!deleteUser) throw new Error("");

        return true;
    }
}