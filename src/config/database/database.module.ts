import { Module } from "@nestjs/common";
import { EnvModule } from "../env/env.module";
import { databaseProviders } from "./database.provider";

@Module({
    imports: [EnvModule],
    providers: [...databaseProviders],
    exports: [...databaseProviders],
})
export class DatabaseModule {}