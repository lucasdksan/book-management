import { HttpStatus, Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { CreateAuthorDTO } from "./dto/create-author.dto";
import { UpdatePutAuthorDTO } from "./dto/update-put-author.dto";
import { UpdatePatchAuthorDTO } from "./dto/update-patch-author.dto";
import { CustomException } from "../../common/exceptions/custom-exception.exception";


@Injectable()
export class AuthorService {
    constructor(private readonly prisma: PrismaService) { }

    private async authorExistsInDb(name?: string, id?: number){
        const author = await this.prisma.authors.findFirst({
            where: {
                OR: [
                    { name },
                    { id }
                ].filter(Boolean)
            }
        });

        return !!author;
    }

    async create(data: CreateAuthorDTO) {
        const authorExists = await this.authorExistsInDb(data.name, undefined);

        if (authorExists) throw new CustomException(false, "Erro ao registrar o autor, Autor já registrado!", HttpStatus.UNPROCESSABLE_ENTITY);

        const authorCreate = await this.prisma.authors.create({ data });

        if (!authorCreate) throw new CustomException(false, "Erro ao registrar o autor, Revisar os dados oferecidos!", HttpStatus.BAD_REQUEST);

        return {
            success: true,
            message: "Autor registrado com sucesso!"
        };
    }

    async list() {
        const authorList = await this.prisma.authors.findMany();

        if (!authorList) throw new CustomException(false, "Erro ao listar os autores!", HttpStatus.BAD_REQUEST);

        return authorList;
    }

    async show(id: number) {
        const author = await this.prisma.authors.findUnique({
            where: { id }
        });

        if (!author) throw new CustomException(false, "Erro ao buscar o autor!", HttpStatus.BAD_REQUEST);

        return author;
    }

    async update(data: UpdatePutAuthorDTO, id: number) {
        const updateAuthor = await this.prisma.authors.update({
            where: { id },
            data
        });

        if (!updateAuthor) throw new CustomException(false, "Erro ao atualizar o autor!", HttpStatus.BAD_REQUEST);

        return {
            success: true,
            message: "Informações do autor atualizado!"
        };
    }

    async updatePatch(data: UpdatePatchAuthorDTO, id: number) {
        const updateAuthor = await this.prisma.authors.update({
            where: { id },
            data
        });

        if (!updateAuthor) throw new CustomException(false, "Erro ao atualizar o autor!", HttpStatus.BAD_REQUEST);

        return {
            success: true,
            message: "Informações do autor atualizado!"
        };
    }

    async delete(id: number) {        
        const deleteBooks = await this.prisma.books.deleteMany({
            where: { author_id: id }
        });

        const deleteAuthor = await this.prisma.authors.delete({
            where: { id }
        });

        if (!deleteAuthor || !deleteBooks) throw new CustomException(false, "Erro ao deletar o Autor!", HttpStatus.BAD_REQUEST);

        return {
            success: true,
            message: "Autor deletado com sucesso!"
        };
    }
}