function AnimalDAO(connection) {
    this._connection = connection
}

AnimalDAO.prototype.cadastrar = function(ojb, callback) {
    this._connection.query('insert into animal set ?', ojb, callback)
}

AnimalDAO.prototype.deletar = function(id, callback) {
    this._connection.query('delete from animal where id_animal = '+id, callback)
}

AnimalDAO.prototype.editar = function(id, tipoDado, dado, callback) {
    this._connection.query('update animal set '+tipoDado+' = "'+dado+'" where id_animal = '+id, callback)
}

AnimalDAO.prototype.editar = function(id, nome, data_nasc, nome_especie, nome_raca, callback) {
    this._connection.query('update animal set nome = "'+nome+'", data_nasc = "'+data_nasc+'", nome_especie = "'+nome_especie+'", nome_raca = "'+nome_raca+'" where id_animal = '+id, callback)
}

AnimalDAO.prototype.total = function(callback) {
    this._connection.query('select count(id_animal) as totalCount from animal', callback)
}

AnimalDAO.prototype.listar = function(perPage, offset, callback) {
    this._connection.query('select * from animal order by id_animal desc limit '+perPage+' offset '+offset, callback)
}

AnimalDAO.prototype.listar = function(perPage, offset, callback) {
    this._connection.query('select a.id_animal, a.id_dono, a.nome, a.data_nasc, a.nome_especie, a.nome_raca, c.nome as nome_dono, c.cpf as cpf_dono from animal a, cliente c where a.id_dono = c.id_dono order by a.id_animal desc limit '+perPage+' offset '+offset, callback)
}

AnimalDAO.prototype.pesquisar = function(obj, callback) {
    this._connection.query('select a.id_animal, a.id_dono, a.nome, a.data_nasc, a.nome_especie, a.nome_raca, c.nome as nome_dono, c.cpf as cpf_dono from animal a, cliente c where (a.nome like "%'+obj+'%" and a.id_dono = c.id_dono) or (a.data_nasc like "%'+obj+'%" and a.id_dono = c.id_dono) or (a.nome_especie like "%'+obj+'%" and a.id_dono = c.id_dono) or (a.nome_raca like "%'+obj+'%" and a.id_dono = c.id_dono) or (c.nome like "%'+obj+'%" and a.id_dono = c.id_dono) or (c.cpf like "%'+obj+'%" and a.id_dono = c.id_dono)', callback)
}

AnimalDAO.prototype.pesquisarId = function(id, callback) {
    this._connection.query('select a.*, c.nome as nome_dono from animal a, cliente c where id_animal = '+id+' and a.id_dono = c.id_dono', callback)
}

AnimalDAO.prototype.pesquisarIdDono = function(id, callback) {
    this._connection.query('select * from animal where id_dono = '+id, callback)
}

AnimalDAO.prototype.pesquisarIdDono = function(id, callback) {
    this._connection.query('select * from animal where id_dono = '+id, callback)
}

AnimalDAO.prototype.pesquisarConsultas = function(id, callback) {
    this._connection.query('select a.id_animal, h.*, ag.data, ag.id_agenda, u.nome as nome_usuario, u.id_user from historico h, agenda ag, usuario u, animal a where a.id_animal = '+id+' and a.id_animal = h.id_animal and u.id_user = h.id_user and ag.id_agenda = h.id_agenda order by h.id_historico desc', callback)
}

module.exports = function() {
    return AnimalDAO
}