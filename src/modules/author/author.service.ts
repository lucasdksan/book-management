import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { CreateAuthorDTO } from "./dto/create-author.dto";
import { UpdatePutAuthorDTO } from "./dto/update-put-author.dto";
import { UpdatePatchAuthorDTO } from "./dto/update-patch-author.dto";

@Injectable()
export class AuthorService {
    constructor(private readonly prisma: PrismaService){}

    async create(data: CreateAuthorDTO){
        const authorCreate = await this.prisma.authors.create({
            data
        });

        if(!authorCreate) return { success: false, message: "Erro ao registrar o autor, Revisar os dados oferecidos!" };

        return { success: true, message: "Autor registrado com sucesso!" }
    }

    async list(){
        const authorList = await this.prisma.authors.findMany();

        if(!authorList) return { success: false, message: "Erro ao listar os autores!" };

        return authorList;
    }

    async show(id: number){
        const author = await this.prisma.authors.findUnique({
            where: { id }
        });

        if(!author) return { success: false, message: "Erro ao buscar o autor!" };
        
        return author;
    }

    async update(data: UpdatePutAuthorDTO, id: number){
        const updateAuthor = await this.prisma.authors.update({
            where: { id },
            data
        });

        if(!updateAuthor) return { success: false, message: "Erro ao atualizar o autor!" };

        return { success: true, message: "Informações do autor atualizado!" };
    }

    async updatePatch(data: UpdatePatchAuthorDTO, id: number) {
        const updateAuthor = await this.prisma.authors.update({
            where: { id },
            data
        });

        if(!updateAuthor) return { success: false, message: "Erro ao atualizar o autor!" };

        return { success: true, message: "Informações do autor atualizado!" };
    }

    async delete(id: number){
        const deleteBooks = await this.prisma.books.deleteMany({
            where: { author_id: id }
        });
    
        const deleteAuthor = await this.prisma.authors.delete({
            where: { id }
        });

        if(!deleteAuthor || !deleteBooks) return { success: false, message: "Erro ao deletar o Autor!" };

        return { success: true, message: "Autor deletado com sucesso!" };
    }
}