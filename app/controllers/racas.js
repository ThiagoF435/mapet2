module.exports.cadastrar = function(app, req, res) {
    if(req.session.loggedin != true) {
        return res.redirect('/')
    }

    var conn = app.config.databaseConnection()
    var model = new app.app.models.EspecieDAO(conn)

    model.pesquisar('', function(err, result) {
        if(err) throw err

        res.render('racas/cadastrar', {dados : result})
    })
}

module.exports.salvarCadastro = function(app, req, res) {
    if(req.session.loggedin != true) {
        return res.redirect('/')
    }

    var conn = app.config.databaseConnection()
    var model = new app.app.models.RacaDAO(conn)
    var obj = req.body

    model.cadastrar(obj, function(err, result) {
        if(err) throw err

        res.redirect('/racas/listar')
    })
}

module.exports.deletar = function(app, req, res) {
    if(req.session.loggedin != true) {
        return res.redirect('/')
    }

    var conn = app.config.databaseConnection()
    var model = new app.app.models.RacaDAO(conn)
    var id = parseInt(req.query.id)

    model.deletar(id, function(err, result) {
        if(err) {
            console.log('Não é possível deletar dados conectados')
        } 

        res.redirect('/racas/listar')
    })
}

module.exports.editar = function(app, req, res) {
    if(req.session.loggedin != true) {
        return res.redirect('/')
    }

    var id = parseInt(req.query.id)
    var conn = app.config.databaseConnection()
    var modelEspecie = new app.app.models.EspecieDAO(conn)
    var modelRaca = new app.app.models.RacaDAO(conn)

    modelEspecie.pesquisar('', function(err, resultEspecie) {
        if(err) throw err
        modelRaca.pesquisarId(id, function(err, result) {
            if(err) throw err

            res.render('racas/editar', {dados : result, id : id, dadosEspecie : resultEspecie})
        })
    })
}

module.exports.visualizar = function(app, req, res) {
    if(req.session.loggedin != true) {
        return res.redirect('/')
    }

    var id = parseInt(req.query.id)
    var conn = app.config.databaseConnection()
    var modelRaca = new app.app.models.RacaDAO(conn)

    modelRaca.pesquisarId(id, function(err, result) {
        if(err) throw err

        res.render('racas/visualizar', {dados : result, id : id})
    })
}

module.exports.salvarEdicao = function(app, req, res) {
    if(req.session.loggedin != true) {
        return res.redirect('/')
    }

    var id = parseInt(req.body.id)
    var nome_raca = req.body.nome_raca
    var id_especie = req.body.id_especie
    var conn = app.config.databaseConnection()
    var model = new app.app.models.RacaDAO(conn)

    model.editar(id, 'id_especie', id_especie, function(err, result) {
        if(err) throw err

        model.editar(id, 'nome_raca', nome_raca, function(err, result) {
            if(err) throw err
    
            res.redirect('/racas/listar')
        })
    })
}

module.exports.listar = function(app, req, res) {
    if(req.session.loggedin != true) {
        return res.redirect('/')
    }

    var conn = app.config.databaseConnection()
    var model = new app.app.models.RacaDAO(conn)

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

            res.render('racas/listar', {dados : result, page : page})
        })
    })
}

module.exports.pesquisar = function(app, req, res) {
    if(req.session.loggedin != true) {
        return res.redirect('/')
    }
    
    var conn = app.config.databaseConnection()
    var model = new app.app.models.RacaDAO(conn)
    var obj = req.body.obj

    model.pesquisar(obj, function(err, result) {
        if(err) throw err

        res.render('racas/listar', {dados : result})
    })
}

