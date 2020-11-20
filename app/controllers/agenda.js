module.exports.cadastrar = function(app, req, res) {
    if(req.session.loggedin != true) {
        return res.redirect('/')
    }

    var conn = app.config.databaseConnection()
    var modelCliente = new app.app.models.ClienteDAO(conn)
    var modelUsuario = new app.app.models.UsuarioDAO(conn)

    modelCliente.pesquisar('', function(err, resultCliente) {
        if(err) throw err
        modelUsuario.pesquisarVeterinarios(function(err, resultUsuario) {
            if(err) throw err

            res.render('agenda/cadastrar', {dadosCliente : resultCliente, dadosUsuario : resultUsuario})
        })
    })
}

module.exports.cadastrar2 = function(app, req, res) {
    if(req.session.loggedin != true) {
        return res.redirect('/')
    }

    var conn = app.config.databaseConnection()
    var modelAnimal = new app.app.models.AnimalDAO(conn)
    var modelCliente = new app.app.models.ClienteDAO(conn)
    var modelUsuario = new app.app.models.UsuarioDAO(conn)
    var obj = req.body

    modelAnimal.pesquisarIdDono(obj.id_dono, function(err, resultAnimal) {
        if(err) throw err
        modelCliente.pesquisarId(obj.id_dono, function(err, resultCliente) {
            if(err) throw err
            modelUsuario.pesquisarId(obj.id_user, function(err, resultUsuario) {
                if(err) throw err

                res.render('agenda/cadastrar2', {dados : obj, dadosAnimal : resultAnimal, dadosCliente : resultCliente, dadosUsuario : resultUsuario})
            }) 
        })
    })
}

module.exports.salvarCadastro = function(app, req, res) {
    if(req.session.loggedin != true) {
        return res.redirect('/')
    }

    var conn = app.config.databaseConnection()
    var model = new app.app.models.AgendaDAO(conn)
    var obj = req.body

    model.cadastrar(obj, function(err, result) {
        if(err) throw err

        res.redirect('/agenda/listar')
    })
}

module.exports.deletar = function(app, req, res) {
    if(req.session.loggedin != true) {
        return res.redirect('/')
    }

    var conn = app.config.databaseConnection()
    var model = new app.app.models.AgendaDAO(conn)
    var id = parseInt(req.query.id)

    model.deletar(id, function(err, result) {
        if(err) {
            console.log('Não é possível deletar dados conectados')
        } 

        res.redirect('/agenda/listar')
    })
}

module.exports.editar = function(app, req, res) {
    if(req.session.loggedin != true) {
        return res.redirect('/')
    }

    var id_agenda = parseInt(req.query.id_agenda)
    var id_dono = parseInt(req.query.id_dono)
    var conn = app.config.databaseConnection()
    var modelAgenda = new app.app.models.AgendaDAO(conn)
    var modelAnimal = new app.app.models.AnimalDAO(conn)
    var modelUsuario = new app.app.models.UsuarioDAO(conn)

    modelAnimal.pesquisarIdDono(id_dono, function(err, resultAnimal) {
        if(err) throw err
            modelAgenda.pesquisarId(id_agenda, function(err, resultAgenda) {
                if(err) throw err
                modelUsuario.pesquisarVeterinarios(function(err, resultUsuario) {
                    if(err) throw err

                    res.render('agenda/editar', {id : id_agenda, dadosAgenda : resultAgenda, dadosAnimal : resultAnimal, dadosUsuario : resultUsuario})
                })
            })
        })
}

module.exports.editarData = function(app, req, res) {
    if(req.session.loggedin != true) {
        return res.redirect('/')
    }

    var id = parseInt(req.query.id)
    var conn = app.config.databaseConnection()
    var model = new app.app.models.AgendaDAO(conn)

    model.pesquisarId(id, function(err, result) {
        if(err) throw err

        res.render('agenda/editarData', {id : id, dados: result})
    })
}

module.exports.visualizar = function(app, req, res) {
    if(req.session.loggedin != true) {
        return res.redirect('/')
    }

    var id = parseInt(req.query.id)
    var conn = app.config.databaseConnection()
    var model = new app.app.models.AgendaDAO(conn)

    model.pesquisarId(id, function(err, result) {
        if(err) throw err
        
        res.render('agenda/visualizar', {id : id, dados : result, session : req.session})
    })
}

module.exports.salvarEdicao = function(app, req, res) { 
    if(req.session.loggedin != true) {
        return res.redirect('/')
    }

    var obj = req.body
    var id = parseInt(req.body.id)
    var conn = app.config.databaseConnection()
    var model = new app.app.models.AgendaDAO(conn)

    model.pesquisarEditar(id, function(err, result) {
        if(err) throw err

        if(obj.motivo == '') 
            obj.motivo = result[0].motivo
        if(obj.id_user == '') 
            obj.id_user = result[0].id_user
        if(obj.id_animal == '') 
            obj.id_animal = result[0].id_animal
        
        model.editar(id, obj.motivo, obj.id_user, obj.id_animal, function(err, result) {
            if(err) throw err
    
            res.redirect('/agenda/listar')
        })
    })
}

module.exports.salvarEdicaoData = function(app, req, res) {
    if(req.session.loggedin != true) {
        return res.redirect('/')
    }

    var obj = req.body.data
    var id = parseInt(req.body.id)
    var conn = app.config.databaseConnection()
    var model = new app.app.models.AgendaDAO(conn)

    model.editarData(id, obj, function(err, result) {
        if(err) throw err

        res.redirect('/agenda/listar')
    })
}

module.exports.listar = function(app, req, res) {
    if(req.session.loggedin != true) {
        return res.redirect('/')
    }

    var conn = app.config.databaseConnection()
    var model = new app.app.models.AgendaDAO(conn)

    model.total(function(err, result) {
        if(err) throw err

        var totalCount = result[0].totalCount

        var perPage = 10

        var currentPage = parseInt(req.query.page) > 1 ? parseInt(req.query.page) : 1
        var nextPage = currentPage + 1
        var previousPage = currentPage - 1
        var pageCount = Math.ceil(totalCount / perPage)
        var offset = currentPage > 1 ? previousPage * perPage : 0
        
        model.listar(perPage, offset, function(err, result) {
            if(err) throw err

            page = {
                currentPage : currentPage,
                nextPage : nextPage,
                previousPage : previousPage,
                pageCount : pageCount
            }

            res.render('agenda/listar', {dados : result, page : page})
        })
    })
}

module.exports.pesquisar = function(app, req, res) {
    if(req.session.loggedin != true) {
        return res.redirect('/')
    }

    var conn = app.config.databaseConnection()
    var model = new app.app.models.AgendaDAO(conn)
    var obj = req.body.obj

    model.pesquisar(obj, function(err, result) {
        if(err) throw err

        res.render('agenda/listar', {dados : result})
    })
}

module.exports.pesquisarHoje = function(app, req, res) {
    if(req.session.loggedin != true) {
        return res.redirect('/')
    }

    var conn = app.config.databaseConnection()
    var model = new app.app.models.AgendaDAO(conn)

    var today = new Date()

    var dd = String(today.getDate()).padStart(2, '0')
    var mm = String(today.getMonth() + 1).padStart(2, '0')
    var yyyy = today.getFullYear()

    var obj = yyyy + '-' + mm + '-' + dd

    model.pesquisar(obj, function(err, result) {
        if(err) throw err

        res.render('agenda/listar', {dados : result})
    })
}

module.exports.pesquisarMes = function(app, req, res) {
    if(req.session.loggedin != true) {
        return res.redirect('/')
    }

    var conn = app.config.databaseConnection()
    var model = new app.app.models.AgendaDAO(conn)

    var today = new Date()

    var dd = String(today.getDate()).padStart(2, '0')
    var mm = String(today.getMonth() + 1).padStart(2, '0')
    var yyyy = today.getFullYear()

    var obj = yyyy + '-' + mm + '-'

    model.pesquisar(obj, function(err, result) {
        if(err) throw err

        res.render('agenda/listar', {dados : result})
    })
}

module.exports.compareceuSim = function(app, req, res) {
    if(req.session.loggedin != true) {
        return res.redirect('/')
    }

    var conn = app.config.databaseConnection()
    var model = new app.app.models.AgendaDAO(conn)
    var id = parseInt(req.query.id)

    model.compareceuSim(id, function(err, result) {
        if(err) throw err

        res.redirect('/agenda/listar')
    })
}

module.exports.compareceuNao = function(app, req, res) {
    if(req.session.loggedin != true) {
        return res.redirect('/')
    }
    
    var conn = app.config.databaseConnection()
    var model = new app.app.models.AgendaDAO(conn)
    var id = parseInt(req.query.id)

    model.compareceuNao(id, function(err, result) {
        if(err) throw err

        res.redirect('/agenda/listar')
    })
}

