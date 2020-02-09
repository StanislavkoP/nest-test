import { Module, Provider } from "@nestjs/common";
import { IENV } from "./env.interface";

const enviroment = process.env.NODE_ENV || 'development';
const provider: Provider = {
    provide: IENV,
    useFactory: () => import(`./${enviroment}.env`).then(({ env }) => env),
}

@Module({
    providers: [provider],
    exports: [provider]
})
export class EnvModule {};