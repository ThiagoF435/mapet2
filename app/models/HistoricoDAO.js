function HistoricODAO(connection) {
    this._connection = connection
}

HistoricODAO.prototype.cadastrar = function(obj, callback) {
    this._connection.query('insert into historico set ?', obj, callback)
}

HistoricODAO.prototype.total = function(callback) {
    this._connection.query('select count(id_historico) as totalCount from historico', callback)
}

HistoricODAO.prototype.listar = function(perPage, offset, callback) {
    this._connection.query('select h.id_historico, ag.id_agenda, ag.data, c.nome as nome_dono, c.id_dono, an.nome, an.id_animal, u.nome as nome_usuario, u.id_user from historico h, agenda ag, cliente c, animal an, usuario u where (h.id_user = u.id_user and h.id_animal = an.id_animal and h.id_agenda = ag.id_agenda and c.id_dono = an.id_dono) order by h.id_historico desc limit '+perPage+' offset '+offset, callback)
}

HistoricODAO.prototype.pesquisar = function(obj, callback) {
    this._connection.query('select h.id_historico, ag.id_agenda, ag.data, c.nome as nome_dono, c.id_dono, an.nome, an.id_animal, u.nome as nome_usuario, u.id_user from historico h, agenda ag, cliente c, animal an, usuario u where (c.nome like "%'+obj+'%" and h.id_user = u.id_user and h.id_animal = an.id_animal and h.id_agenda = ag.id_agenda and c.id_dono = an.id_dono) or (an.nome like "%'+obj+'%" and h.id_user = u.id_user and h.id_animal = an.id_animal and h.id_agenda = ag.id_agenda and c.id_dono = an.id_dono) or (ag.data like "%'+obj+'%" and h.id_user = u.id_user and h.id_animal = an.id_animal and h.id_agenda = ag.id_agenda and c.id_dono = an.id_dono) or (u.nome like "%'+obj+'%" and h.id_user = u.id_user and h.id_animal = an.id_animal and h.id_agenda = ag.id_agenda and c.id_dono = an.id_dono)', callback)
}

HistoricODAO.prototype.pesquisarId = function(id, callback) {
    this._connection.query('select h.*, ag.id_agenda, ag.data, c.nome as nome_dono, c.id_dono, an.nome, an.id_animal, u.nome as nome_usuario, u.id_user from historico h, agenda ag, cliente c, animal an, usuario u where id_historico = '+id+' and h.id_user = u.id_user and h.id_animal = an.id_animal and h.id_agenda = ag.id_agenda and c.id_dono = an.id_dono', callback)
}

HistoricODAO.prototype.gerarRelatorio = function(id, data_inicio, data_final, callback) {
    this._connection.query('select h.*, ag.id_agenda, ag.data, c.nome as nome_dono, c.id_dono, an.nome as nome_animal, an.id_animal, u.nome as nome_veterinario, u.id_user from historico h, agenda ag, cliente c, animal an, usuario u where u.id_user = '+id+' and (ag.data between "'+data_inicio+'" and "'+data_final+'") and h.id_user = u.id_user and h.id_animal = an.id_animal and h.id_agenda = ag.id_agenda and c.id_dono = an.id_dono', callback)
}

module.exports = function() {
    return HistoricODAO
}