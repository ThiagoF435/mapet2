function RacaDAO(connection) {
    this._connection = connection
}

RacaDAO.prototype.cadastrar = function(obj, callback) {
    this._connection.query('insert into raca set ?', obj, callback)
}

RacaDAO.prototype.deletar = function(id, callback) {
    this._connection.query('delete from raca where id_raca = '+id, callback)
}

RacaDAO.prototype.editar = function(id, tipoDado, dado, callback) {
    this._connection.query('update raca set '+tipoDado+' = "'+dado+'" where id_raca = '+id, callback)
}

RacaDAO.prototype.total = function(callback) {
    this._connection.query('select count(id_raca) as totalCount from raca', callback)
}

RacaDAO.prototype.listar = function(perPage, offset, callback) {
    this._connection.query('select r.id_raca, r.nome_raca, e.nome_especie from raca r, especie e where e.id_especie = r.id_especie order by r.id_raca desc limit '+perPage+' offset '+offset, callback)
}

RacaDAO.prototype.pesquisar = function(obj, callback) {
    this._connection.query('select r.id_raca, r.nome_raca, r.id_especie, e.nome_especie from raca r, especie e where (r.nome_raca like "%'+obj+'%" and r.id_especie = e.id_especie) or (e.nome_especie like "%'+obj+'%" and r.id_especie = e.id_especie)', callback)
}

RacaDAO.prototype.pesquisarId = function(id, callback) {
    this._connection.query('select r.id_raca, r.nome_raca, r.id_especie, e.nome_especie from raca r, especie e where id_raca = '+id+' and r.id_especie = e.id_especie', callback)
}

module.exports = function() {
    return RacaDAO
}