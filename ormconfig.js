module.exports = {
    type: 'postgres',
    host: 'postgres',
    port: 5432,
    username: 'postgres',
    password: 'admin',
    database: 'test',
    entities: [__dirname + '/../**/*.entity.{js,ts}'],
    synchronize: false,
    migrationsRun: true,
    logging: true,
    logger: 'file',
    migrations : [
      "dist/migration/**/*.js"
    ],
    seeds: ['seeds/**/*.seed.ts'],
    cli: {
      migrationsDir: 'src/migrations',
    },
}