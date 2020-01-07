import { createConnection } from 'typeorm';
import { Provider } from '@nestjs/common';
import { IENV } from '../env/env.interface';


export const databaseProviders: Provider[] = [
    {
        provide: 'DBConnectionToken',
        useFactory: async (env: IENV) => {
            return createConnection({
                type: 'postgres',
                host: env.DB_HOST,
                port: env.DB_PORT,
                username: env.DB_USERNAME,
                password: env.DB_PASSWORD,
                database: env.DB_DATABASE,
                entities: [__dirname + '/../**/*.entity.{js,ts}'],
                synchronize: false,
                migrationsRun: false,
                logging: true,
                logger: 'file',
                migrations: ['src/migrations/**/*{.ts,.js}'],
                cli: {
                  migrationsDir: 'src/migrations',
                },
            })
        },
        inject: [IENV]
    }
]