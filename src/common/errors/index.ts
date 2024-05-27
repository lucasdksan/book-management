class BaseError extends Error {
    constructor({ name }: { name: string }){
        super();
        this.name = name;
    }
}