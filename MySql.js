const mysql = require('mysql')
const pool = mysql.createPool({
    "user":"root",
    "password":'root123',
    "database":"DBUser",
    "host":"localhost",
    "port":3306
})
exports.pool=pool
