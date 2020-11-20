function ClienteDAO(connection) {
    this._connection = connection
}

ClienteDAO.prototype.cadastrar = function(obj, callback) {
    this._connection.query('insert into cliente set ?', obj, callback)
}

ClienteDAO.prototype.deletar = function(id, callback) {
    this._connection.query('delete from cliente where id_dono = '+id, callback)
}

ClienteDAO.prototype.editar = function(id, email, nome, data_nasc, rg, telefone, callback) {
    this._connection.query('update cliente set email = "'+email+'", nome = "'+nome+'", data_nasc = "'+data_nasc+'", rg = "'+rg+'", telefone = "'+telefone+'" where id_dono = '+id, callback)
}

ClienteDAO.prototype.total = function(callback) {
    this._connection.query('select count(id_dono) as totalCount from cliente', callback)
}

ClienteDAO.prototype.listar = function(perPage, offset, callback) {
    this._connection.query('select * from cliente order by id_dono desc limit '+perPage+' offset '+offset, callback)
}

ClienteDAO.prototype.pesquisar = function(obj, callback) {
    this._connection.query('select * from cliente where nome like "%'+obj+'%" or rg like "%'+obj+'%" or cpf like "%'+obj+'%" or email like "%'+obj+'%" or telefone like "%'+obj+'%"', callback)
}

ClienteDAO.prototype.pesquisarId = function(id, callback) {
    this._connection.query('select * from cliente where id_dono = '+id, callback)
}

module.exports = function() {
    return ClienteDAO
}