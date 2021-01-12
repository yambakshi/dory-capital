export default {
    apiPort: Number(process.env.API_PORT),
    cookiesPrefix: 'dory_capital_',
    mongodb: {
        uriPrefix: process.env.MONGODB_URI_PREFIX,
        username: process.env.MONGODB_USERNAME,
        password: process.env.MONGODB_PASSWORD,
        host: process.env.MONGODB_HOST,
        dbName: process.env.MONGODB_DB
    },
    jwt: {
        secret: 'yambakshiwillnevertell',
        issuer: 'dory-capital',
        audience: 'dory-capital',
        expiresIn: '86400000'
    },
}