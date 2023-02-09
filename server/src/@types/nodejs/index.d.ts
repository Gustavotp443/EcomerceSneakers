declare namespace NodeJS{
    interface ProcessEnv{
        MONGO_URI:string
        TOKEN_SECRET:string
        TOKEN_EXPIRATION:string
        NodeJS: 'development' | 'production'
    }
}
