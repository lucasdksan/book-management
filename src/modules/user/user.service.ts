import * as bcrypt from "bcrypt";
import { HttpStatus, Injectable } from "@nestjs/common";
import { Role as PrismaRole } from "@prisma/client";
import { PrismaService } from "../../prisma/prisma.service";
import { CreateUserDTO } from "./dto/create-user.dto";
import { ViewUserDTO } from "./dto/view-user.dto";
import { Role } from "../../common/enums/role.enum";
import { UpdatePutUserDTO } from "./dto/update-put-user.dto";
import { UpdatePatchUserDTO } from "./dto/update-patch-user.dto";
import { CustomException } from "../../common/exceptions/custom-exception.exception";

@Injectable()
export class UserService {
    constructor(private readonly prisma: PrismaService) { }

    private convertPrismaRoleToRole(prismaRole: PrismaRole): Role {
        if(prismaRole === "ADMIN") {
            return Role.Admin;
        } else {
            return Role.User;
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

        if(existUser) throw new CustomException(false, "Usuário já registrado!", HttpStatus.UNPROCESSABLE_ENTITY);

        const userCreate = await this.prisma.users.create({
            data: {
                password: newPassword,
                ...user
            }
        });

        if(!userCreate) throw new CustomException(false, "Erro ao registrar o usuário!", HttpStatus.BAD_REQUEST);
        
        return { success: true, message: "Usuário registrado" };
    }

    async list() {
        const users = await this.prisma.users.findMany({
            where: {
                role: "USER"
            }
        });

        if (!users) throw new CustomException(false, "Erro ao listar os usuários!", HttpStatus.BAD_REQUEST);

        const viewUsersDTO = users.map((user)=> {
            let viewUserDTO: ViewUserDTO = {
                id: user.id,
                email: user.email,
                name: user.name,
                createdAt: user.created_at.toISOString(),
                birth_at: user.birth_at?.toISOString(),
                penaltyEndDate: user.penalty_end_date?.toISOString(),
                role: this.convertPrismaRoleToRole(user.role),
                score: user.score
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

        if (!user) throw new CustomException(false, "Erro ao buscar o usuário!", HttpStatus.BAD_REQUEST);

        const viewUserDTO: ViewUserDTO = {
            id: user.id,
            email: user.email,
            name: user.name,
            createdAt: user.created_at.toISOString(),
            birth_at: user.birth_at?.toISOString(),
            penaltyEndDate: user.penalty_end_date?.toISOString(),
            role: this.convertPrismaRoleToRole(user.role),
            score: user.score
        }

        return viewUserDTO;
    }

    async update(data: UpdatePutUserDTO ,id: number) {
        const updateUser = await this.prisma.users.update({
            where: { id },
            data
        });

        if(!updateUser) throw new CustomException(false, "Erro ao atualizar o usuário!", HttpStatus.BAD_REQUEST);
        
        return { success: true, message: "Usuário atualizado!" };
    }

    async updatePatch(data: UpdatePatchUserDTO, id: number) {
        const updateUser = await this.prisma.users.update({
            where: { id },
            data
        });

        if(!updateUser) throw new CustomException(false, "Erro ao atualizar o usuário!", HttpStatus.BAD_REQUEST);
        
        return { success: true, message: "Usuário atualizado!" };
    }

    async delete(id: number) {
        const deleteUser = await this.prisma.users.delete({
            where: {
                id
            }
        });

        if(!deleteUser) throw new CustomException(false, "Erro ao deletar o usuário!", HttpStatus.BAD_REQUEST);
        
        return { success: true, message: "Usuário deletado!" };
    }
}