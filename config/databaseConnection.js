var mysql = require('mysql')

var connectMySQL = function() {
    return mysql.createConnection({
        host: 'localhost',
        user: 'mapetliv_default',
        password: '6*aN2t8w',
        database: 'mapetliv_default'
    })
}

module.exports = function() {
    return connectMySQL
}