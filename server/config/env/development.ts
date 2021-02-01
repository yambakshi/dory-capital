export default {
    apiPort: Number(process.env.API_PORT),
    cors: {
        origin: process.env.CORS_ORIGIN
    },
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
    cloudinary: {
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
    }
}