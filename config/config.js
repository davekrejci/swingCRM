let config = {
    port: process.env.PORT || 3000,
    db: {
        uri: process.env.DATABASE_URL || 'postgres://postgres:heslo@localhost:5432/swing',
        options: {
            dialect: process.env.DIALECT || 'postgres',
            host: process.env.HOST || 'localhost',
            operatorsAliases: false,
            logging: true
        }
    }
};

module.exports = config;
