module.exports.cadastrar = function(app, req, res) {
    if(req.session.loggedin != true) {
        return res.redirect('/')
    }

    var conn = app.config.databaseConnection()
    var modelEspecie = new app.app.models.EspecieDAO(conn)


    modelEspecie.pesquisar('', function(err, resultEspecie) {
    if(err) throw err

        res.render('animais/cadastrar', {dadosEspecie : resultEspecie})
    })
}

module.exports.cadastrar2 = function(app, req, res) {
    if(req.session.loggedin != true) {
        return res.redirect('/')
    }

    var conn = app.config.databaseConnection()
    var obj = req.body
    var modelRaca = new app.app.models.RacaDAO(conn)
    var modelCliente = new app.app.models.ClienteDAO(conn)

    modelCliente.pesquisar('', function(err, resultCliente) {
        if(err) throw err
        modelRaca.pesquisar(obj.nome_especie, function(err, resultRaca) {
            if(err) throw err

            res.render('animais/cadastrar2', {dados : obj, dadosRaca : resultRaca, dadosCliente : resultCliente})
        })
    })
}

module.exports.salvarCadastro = function(app, req, res) {
    if(req.session.loggedin != true) {
        return res.redirect('/')
    }

    var conn = app.config.databaseConnection()
    var model = new app.app.models.AnimalDAO(conn)
    var obj = req.body

    model.cadastrar(obj, function(err, result) {
        if(err) throw err

        res.redirect('/animais/listar')
    })
}

module.exports.deletar = function(app, req, res) {
    if(req.session.loggedin != true) {
        return res.redirect('/')
    }

    var conn = app.config.databaseConnection()
    var model = new app.app.models.AnimalDAO(conn)
    var id = parseInt(req.query.id)

    model.deletar(id, function(err, result) {
        if(err) {
            console.log('Não é possível deletar dados conectados')
        } 

        res.redirect('/animais/listar')
    })
}

module.exports.editar = function(app, req, res) {
    if(req.session.loggedin != true) {
        return res.redirect('/')
    }

    var id = parseInt(req.query.id)
    var conn = app.config.databaseConnection()
    var modelAnimal = new app.app.models.AnimalDAO(conn)
    var modelRaca = new app.app.models.RacaDAO(conn)

    modelAnimal.pesquisarId(id, function(err, resultAnimal) {
    if(err) throw err
         modelRaca.pesquisar(resultAnimal[0].nome_especie, function(err, resultRaca) {
            if(err) throw err

            res.render('animais/editar', {id : id, dados : resultAnimal, dadosRaca: resultRaca})
        })
    })
}

module.exports.visualizar = function(app, req, res) {
    if(req.session.loggedin != true) {
        return res.redirect('/')
    }

    var id = parseInt(req.query.id)
    var conn = app.config.databaseConnection()
    var model = new app.app.models.AnimalDAO(conn)

    model.pesquisarId(id, function(err, result) {
        if(err) throw err
        model.pesquisarConsultas(id, function(err, resultConsultas) {
            if(err) throw err

            res.render('animais/visualizar', {id : id, dados : result, consultas : resultConsultas})
        })
    })
}

module.exports.salvarEdicao = function(app, req, res) {
    if(req.session.loggedin != true) {
        return res.redirect('/')
    }

    var obj = req.body
    var id = parseInt(req.body.id)
    var conn = app.config.databaseConnection()
    var model = new app.app.models.AnimalDAO(conn)

    model.pesquisarId(id, function(err, result) {
        if(err) throw err

        if(obj.nome == '') 
            obj.nome = result[0].nome
        if(obj.data_nasc == '') 
            obj.data_nasc = result[0].data_nasc
        if(obj.nome_especie == '') 
            obj.nome_especie = result[0].nome_especie
        if(obj.nome_raca == '') 
            obj.nome_raca = result[0].nome_raca
        if(obj.nome_raca == '') 
            obj.telefone = result[0].telefone
        
        model.editar(id, obj.nome, obj.data_nasc, obj.nome_especie, obj.nome_raca, function(err, result) {
            if(err) throw err
    
            res.redirect('/animais/listar')
        })
    })
}

module.exports.listar = function(app, req, res) {
    if(req.session.loggedin != true) {
        return res.redirect('/')
    }

    var conn = app.config.databaseConnection()
    var model = new app.app.models.AnimalDAO(conn)

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

            res.render('animais/listar', {dados : result, page : page})
        })
    })
}

module.exports.pesquisar = function(app, req, res) {
    if(req.session.loggedin != true) {
        return res.redirect('/')
    }
    
    var conn = app.config.databaseConnection()
    var model = new app.app.models.AnimalDAO(conn)
    var obj = req.body.obj

    model.pesquisar(obj, function(err, result) {
        if(err) throw err

        res.render('animais/listar', {dados : result})
    })
}

