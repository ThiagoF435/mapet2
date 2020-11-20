function AgendaDAO(connection) {
    this._connection = connection
}

AgendaDAO.prototype.cadastrar = function(obj, callback) {
    this._connection.query('insert into agenda set ?', obj, callback)
}

AgendaDAO.prototype.deletar = function(id, callback) {
    this._connection.query('delete from agenda where id_agenda = '+id, callback)
}

AgendaDAO.prototype.editar = function(id, motivo, id_user, id_animal, callback) {
    this._connection.query('update agenda set motivo = "'+motivo+'", id_user = '+id_user+', id_animal = '+id_animal+' where id_agenda = '+id, callback)
}

AgendaDAO.prototype.editarData = function(id, data, callback) {
    this._connection.query('update agenda set data = "'+data+'" where id_agenda = '+id, callback)
}

AgendaDAO.prototype.total = function(callback) {
    this._connection.query('select count(id_agenda) as totalCount from agenda', callback)
}

AgendaDAO.prototype.listar = function(perPage, offset, callback) {
    this._connection.query('select ag.*, c.nome as nome_dono, an.*, u.nome as nome_usuario from agenda ag, cliente c, animal an, usuario u where (ag.id_dono = c.id_dono and ag.id_animal = an.id_animal and ag.id_user = u.id_user) order by ag.data desc limit '+perPage+' offset '+offset, callback)
}

AgendaDAO.prototype.pesquisar = function(obj, callback) {
    this._connection.query('select ag.*, c.nome as nome_dono, an.*, u.nome as nome_usuario from agenda ag, cliente c, animal an, usuario u where (c.nome like "%'+obj+'%" and an.id_dono = c.id_dono and ag.id_dono = c.id_dono and ag.id_animal = an.id_animal and ag.id_user = u.id_user) or (an.nome like "%'+obj+'%" and an.id_dono = c.id_dono and ag.id_dono = c.id_dono and ag.id_animal = an.id_animal and ag.id_user = u.id_user) or (ag.data like "%'+obj+'%" and an.id_dono = c.id_dono and ag.id_dono = c.id_dono and ag.id_animal = an.id_animal and ag.id_user = u.id_user) or (u.nome like "%'+obj+'%" and an.id_dono = c.id_dono and ag.id_dono = c.id_dono and ag.id_animal = an.id_animal and ag.id_user = u.id_user)', callback)
}

AgendaDAO.prototype.pesquisarId = function(id, callback) {
    this._connection.query('select ag.*, c.nome as nome_dono, an.nome as nome_animal, u.nome as nome_usuario from agenda ag, cliente c, animal an, usuario u where id_agenda = '+id+' and ag.id_dono = c.id_dono and ag.id_animal = an.id_animal and ag.id_user = u.id_user', callback)
}

AgendaDAO.prototype.pesquisarEditar = function(id, callback) {
    this._connection.query('select * from agenda where id_agenda = '+id, callback)
}

AgendaDAO.prototype.compareceuSim = function(id, callback) {
    this._connection.query('update agenda set compareceu = "SIM" where id_agenda = '+id, callback)
}

AgendaDAO.prototype.compareceuNao = function(id, callback) {
    this._connection.query('update agenda set compareceu = "NAO" where id_agenda = '+id, callback)
}

module.exports = function() {
    return AgendaDAO
}