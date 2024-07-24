import mysql from "serverless-mysql";

export const connection = mysql({
    config: {
        host: 'localhost',
        user: 'root',
        password: '',
        port: 3306,
        database: 'db_fundacion_jalisco'
    }
})