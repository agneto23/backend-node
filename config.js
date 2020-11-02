module.exports = {
    api: {
        port: process.env.API_PORT || 3000,
    },
    jwt: {
      secret: process.env.JWT_SECRET || 'notasecret!'
    },
    mysql: {
      host: process.env.MYSQL_HOST || 'remotemysql.com',
      user: process.env.MYSQL_USER || 'lT8f5asEh0',
      password: process.env.MYSQL_PASSWORD || 'BU7jrqE9fp',
      database: process.env.MYSQL_DATABASE || 'lT8f5asEh0',
    }
}
