export default {
    apiPort: Number(process.env.API_PORT),
    mongodb: {
        uriPrefix: process.env.MONGODB_URI_PREFIX,
        username: process.env.MONGODB_USERNAME,
        password: process.env.MONGODB_PASSWORD,
        host: process.env.MONGODB_HOST,
        dbName: process.env.MONGODB_DB
    },
    jwtToken: {
        secret: 'pafiIsTheBestAndAllwaysWillBe',
        issuer: 'pafi-inc',
        audience: 'pafi-inc',
        expiresIn: '7d'
    },
}