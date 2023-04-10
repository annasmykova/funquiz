module.exports = {
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5433,
    username: process.env.POSTGRES_USER || 'dev',
    password: process.env.POSTGRES_PASSWORD || 'funquizdev',
    database: process.env.POSTGRES_DB || 'funquizdb',
    synchronize: true,
    logging: false,
    entities: [
        'src/db/entities/**/*.ts'
    ],
    migrations: [
        'src/db/migrations/**/*.ts'
    ],
    cli: {
        entitiesDir: 'src/db/entities',
        migrationsDir: 'src/db/migrations'
    }
}
