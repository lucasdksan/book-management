import { PugAdapter } from "@nestjs-modules/mailer/dist/adapters/pug.adapter";
import { env } from "../src/common/environments/env.environment";

export const forRootMock = {
    transport: {
        host: env.MAILER_HOST,
        port: parseInt(env.MAILER_PORT),
        auth: {
            user: env.MAILER_EMAIL,
            pass: env.MAILER_PASSWORD
        }
    },
    defaults: {
        from: `"nest-modules" <modules@nestjs.com>`,
    },
    template: {
        dir: __dirname + "/templates",
        adapter: new PugAdapter(),
        options: {
            strict: true,
        },
    },
}