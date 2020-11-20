function EspecieDAO(connection) {
    this._connection = connection
}

EspecieDAO.prototype.cadastrar = function(obj, callback) {
    this._connection.query('insert into especie set ?', obj, callback)
}

EspecieDAO.prototype.deletar = function(id, callback) {
    this._connection.query('delete from especie where id_especie = '+id, callback)
}

EspecieDAO.prototype.editar = function(id, tipoDado, dado, callback) {
    this._connection.query('update especie set '+tipoDado+' = "'+dado+'" where id_especie = '+id, callback)
}

EspecieDAO.prototype.total = function(callback) {
    this._connection.query('select count(id_especie) as totalCount from especie', callback)
}

EspecieDAO.prototype.listar = function(perPage, offset, callback) {
    this._connection.query('select * from especie order by id_especie desc limit '+perPage+' offset '+offset, callback)
}

EspecieDAO.prototype.pesquisar = function(obj, callback) {
    this._connection.query('select * from especie where nome_especie like "%'+obj+'%"', callback)
}

EspecieDAO.prototype.pesquisarId = function(id, callback) {
    this._connection.query('select * from especie where id_especie = '+id, callback)
}

module.exports = function() {
    return EspecieDAO
}