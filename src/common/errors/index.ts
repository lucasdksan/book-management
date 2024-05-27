class BaseError extends Error {
    constructor({ name }: { name: string }){
        super();
        this.name = name;
    }
}

export class ExistUserError extends BaseError {
    constructor({ name }: { name: string }){
        super({
            name
        });
    }
}