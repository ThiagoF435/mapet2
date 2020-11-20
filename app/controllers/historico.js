module.exports.cadastrar = function(app, req, res) {
    if(req.session.loggedin != true) {
        return res.redirect('/')
    }

    if(!req.session.cargo.includes('eteri')) { 
        return res.redirect('/erro')
    }

    var id_agenda = parseInt(req.query.id_agenda)
    var id_user = parseInt(req.query.id_user)
    var id_animal = parseInt(req.query.id_animal)
    var conn = app.config.databaseConnection()
    var modelAgenda = new app.app.models.AgendaDAO(conn)
    var modelUsuario = new app.app.models.UsuarioDAO(conn)
    var modelAnimal = new app.app.models.AnimalDAO(conn)

    modelAgenda.pesquisarId(id_agenda, function(err, resultAgenda) {
        if(err) throw err
        modelUsuario.pesquisarId(id_user, function(err, resultUsuario) {
            if(err) throw err
            modelAnimal.pesquisarId(id_animal, function(err, resultAnimal) {
                if(err) throw err

                res.render('historico/cadastrar', {dadosAgenda : resultAgenda, dadosUsuario : resultUsuario, dadosAnimal : resultAnimal, dadosIdAgenda : id_agenda, dadosIdUser : id_user, dadosIdAnimal : id_animal})
            })
        })
    })
}

module.exports.salvarCadastro = function(app, req, res) {
    if(req.session.loggedin != true) {
        return res.redirect('/')
    }

    if(!req.session.cargo.includes('eteri')) { 
        return res.redirect('/erro')
    }

    var conn = app.config.databaseConnection()
    var model = new app.app.models.HistoricoDAO(conn)
    var obj = req.body

    model.cadastrar(obj, function(err, result) {
        if(err) throw err

        res.redirect('/historico/listar')
    })
}

module.exports.visualizar = function(app, req, res) {
    if(req.session.loggedin != true) {
        return res.redirect('/')
    }

    if(!req.session.cargo.includes('eteri')) { 
        return res.redirect('/erro')
    }

    var id = parseInt(req.query.id)
    var conn = app.config.databaseConnection()
    var modelHistorico = new app.app.models.HistoricoDAO(conn)
    var modelAgenda = new app.app.models.AgendaDAO(conn)
    var modelUsuario = new app.app.models.UsuarioDAO(conn)
    var modelAnimal = new app.app.models.AnimalDAO(conn)

    modelHistorico.pesquisarId(id, function(err, resultHistorico) {
        if(err) throw err
        modelAgenda.pesquisarId(resultHistorico[0].id_agenda, function(err, resultAgenda) {
            if(err) throw err
            modelUsuario.pesquisarId(resultHistorico[0].id_user, function(err, resultUsuario) {
                if(err) throw err
                modelAnimal.pesquisarId(resultHistorico[0].id_animal, function(err, resultAnimal) {
                    if(err) throw err
    
                    res.render('historico/visualizar', {dados : resultHistorico, dadosAgenda : resultAgenda, dadosAnimal : resultAnimal, dadosUsuario : resultUsuario})
                })
            })
        })
    })
}

module.exports.listar = function(app, req, res) {
    if(req.session.loggedin != true) {
        return res.redirect('/')
    }

    if(!req.session.cargo.includes('eteri')) {  
        return res.redirect('/erro')
    }

    var conn = app.config.databaseConnection()
    var model = new app.app.models.HistoricoDAO(conn)

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

            res.render('historico/listar', {dados : result, page : page})
        })
    })
}

module.exports.pesquisar = function(app, req, res) {
    if(req.session.loggedin != true) {
        return res.redirect('/')
    }

    if(!req.session.cargo.includes('eteri')) { 
        return res.redirect('/erro')
    }
    
    var conn = app.config.databaseConnection()
    var model = new app.app.models.HistoricoDAO(conn)
    var obj = req.body.obj

    model.pesquisar(obj, function(err, result) {
        if(err) throw err

        res.render('historico/listar', {dados : result})
    })
}

module.exports.relatorio = function(app, req, res) {
    if(req.session.loggedin != true) {
        return res.redirect('/')
    }

    if(!req.session.cargo.includes('eteri')) { 
        return res.redirect('/erro')
    }
    
    res.render('historico/relatorio')
}

module.exports.imprimir = function(app, req, res) {
    if(req.session.loggedin != true) {
        return res.redirect('/')
    }

    if(!req.session.cargo.includes('eteri')) { 
        return res.redirect('/erro')
    }

    var conn = app.config.databaseConnection()
    var model = new app.app.models.HistoricoDAO(conn)
    var id = req.session.id_user
    var data_inicio = req.body.data_inicio
    var data_final = req.body.data_final

    model.gerarRelatorio(id, data_inicio, data_final, function(err, result) {
        if(err) throw err

        var today = new Date()
        var time = 'Data: ' + today.getDate() + '/' + (today.getMonth()+1) + '/' + today.getFullYear() + ' Hora: ' + today.getHours() + ':' + today.getMinutes()

        res.render('historico/imprimir', {dados : result, data : time})
    })
}
