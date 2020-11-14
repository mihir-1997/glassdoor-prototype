const path = require( 'path' )
require( 'dotenv' ).config( { path: path.resolve( __dirname, '../.env' ) } )

let frontend_url = "http://localhost:3000"
let mongodb_string = process.env.MONGO_STRING
let secret = process.env.SECRET
let mysql_username = process.env.MYSQL_USERNAME
let mysql_password = process.env.MYSQL_PASSWORD
let mysql_database = process.env.MYSQL_DATABASE
let mysql_url = process.env.MYSQL_URL
let kafka_url = process.env.KAFKA_URL

module.exports = {
    frontend_url: frontend_url,
    mongodb_string: mongodb_string,
    secret: secret,
    mysql_database: mysql_database,
    mysql_password: mysql_password,
    mysql_username: mysql_username,
    mysql_url: mysql_url,
    kafka_url: kafka_url
}