import { z } from "zod";

const schema = z.object({
    PORT: z.string(),
    DATABASE_URL: z.string(),
    JWT_SECRET: z.string(),
    MAILER_EMAIL: z.string(),
    MAILER_PASSWORD: z.string(),
    MAILER_HOST: z.string(),
    MAILER_PORT: z.string(),
});

export const env = schema.parse(process.env);