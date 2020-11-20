module.exports.cadastrar = function(app, req, res) {
    if(req.session.loggedin != true) {
        return res.redirect('/')
    }

    res.render('especies/cadastrar', {validacao : {}})
}

module.exports.salvarCadastro = function(app, req, res) {
    if(req.session.loggedin != true) {
        return res.redirect('/')
    }

    var conn = app.config.databaseConnection()
    var model = new app.app.models.EspecieDAO(conn)
    var obj = req.body

    model.cadastrar(obj, function(err, result) {
        if(err) throw err

        res.redirect('/especies/listar')
    })
}

module.exports.deletar = function(app, req, res) {
    if(req.session.loggedin != true) {
        return res.redirect('/')
    }

    var conn = app.config.databaseConnection()
    var model = new app.app.models.EspecieDAO(conn)
    var id = parseInt(req.query.id)

    model.deletar(id, function(err, result) {
        if(err) {
            console.log('Não é possível deletar dados conectados')
        } 

        res.redirect('/especies/listar')
    })
}

module.exports.editar = function(app, req, res) {
    if(req.session.loggedin != true) {
        return res.redirect('/')
    }

    var id = parseInt(req.query.id)
    var conn = app.config.databaseConnection()
    var model = new app.app.models.EspecieDAO(conn)

    model.pesquisarId(id, function(err, result) {
        if(err) throw err

        res.render('especies/editar', {id : id, dados : result })
    })
}

module.exports.visualizar = function(app, req, res) {
    if(req.session.loggedin != true) {
        return res.redirect('/')
    }

    var id = parseInt(req.query.id)
    var conn = app.config.databaseConnection()
    var model = new app.app.models.EspecieDAO(conn)

    model.pesquisarId(id, function(err, result) {
        if(err) throw err

        res.render('especies/visualizar', {dados : result })
    })
}

module.exports.salvarEdicao = function(app, req, res) {
    if(req.session.loggedin != true) {
        return res.redirect('/')
    }

    var id = parseInt(req.body.id)
    var tipoDado = 'nome_especie'

    var dado = req.body.nome_especie
    var conn = app.config.databaseConnection()
    var model = new app.app.models.EspecieDAO(conn)

    model.editar(id, tipoDado, dado, function(err, result) {
        if(err) throw err

        res.redirect('/especies/listar')
    })
}

module.exports.listar = function(app, req, res) {
    if(req.session.loggedin != true) {
        return res.redirect('/')
    }

    var conn = app.config.databaseConnection()
    var model = new app.app.models.EspecieDAO(conn)

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

            res.render('especies/listar', {dados : result, page : page})
        })
    })
}

module.exports.pesquisar = function(app, req, res) {
    if(req.session.loggedin != true) {
        return res.redirect('/')
    }
    
    var conn = app.config.databaseConnection()
    var model = new app.app.models.EspecieDAO(conn)
    var obj = req.body.obj

    model.pesquisar(obj, function(err, result) {
        if(err) throw err

        res.render('especies/listar', {dados : result})
    })
}

