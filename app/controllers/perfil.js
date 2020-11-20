module.exports.perfil = function(app, req, res) {
    if(req.session.loggedin != true) {
        return res.redirect('/')
    }

    var id = parseInt(req.session.id_user)
    var conn = app.config.databaseConnection()
    var model = new app.app.models.UsuarioDAO(conn)

    model.pesquisarId(id, function(err, result) {
        if(err) throw err

        res.render('perfil/perfil', {dados : result, session : req.session})
    })
}

module.exports.editarSenha = function(app, req, res) {
    if(req.session.loggedin != true) {
        return res.redirect('/')
    }

    var id = parseInt(req.query.id)

    res.render('perfil/editar_senha', {erro : '', id : id})
}

module.exports.editarSenhaSalvar = function(app, req, res) {
    if(req.session.loggedin != true) {
        return res.redirect('/')
    }

    var obj = req.body
    var id = parseInt(req.body.id)

    if(obj.novaSenha != obj.confirmarNovaSenha) {
        return res.render('perfil/editar_senha', {erro : 'Erro ao confirmar nova senha!', id : id})
    }

    var conn = app.config.databaseConnection()
    var model = new app.app.models.UsuarioDAO(conn)

    model.pesquisarId(id, function(err, result) {
        if(err) throw err

        if(obj.senhaAntiga != result[0].senha) {
            return res.render('perfil/editar_senha', {erro : 'Senha antiga incorreta!', id : id})
        }

        model.editarSenha(id, obj.novaSenha, function(err, result) {
            if(err) throw err

            res.redirect('/perfil')
        })

    })
}

module.exports.editar = function(app, req, res) {
    if(req.session.loggedin != true) {
        return res.redirect('/')
    }

    var id = parseInt(req.query.id)
    var conn = app.config.databaseConnection()
    var model = new app.app.models.UsuarioDAO(conn)

    model.pesquisarId(id, function(err, result) {
        if(err) throw err

        res.render('perfil/editar', {id : id, dados : result })
    })
}

module.exports.salvarEdicao = function(app, req, res) {
    if(req.session.loggedin != true) {
        return res.redirect('/')
    }

    var obj = req.body
    var id = parseInt(req.body.id)
    var conn = app.config.databaseConnection()
    var model = new app.app.models.UsuarioDAO(conn)

    model.pesquisarId(id, function(err, result) {
        if(err) throw err

        if(obj.email == '') 
            obj.email = result[0].email
        if(obj.senha == '') 
            obj.senha = result[0].senha
        if(obj.nome == '') 
            obj.nome = result[0].nome
        if(obj.data_nasc == '') 
            obj.data_nasc = result[0].data_nasc
        if(obj.rg == '') 
            obj.rg = result[0].rg
        if(obj.cargo == '') 
            obj.cargo = result[0].cargo
        if(obj.telefone == '') 
            obj.telefone = result[0].telefone
        
        model.editar(id, obj.email, obj.senha, obj.nome, obj.data_nasc, obj.rg, obj.cargo, obj.telefone, function(err, result) {
            if(err) throw err
    
            res.redirect('/perfil')
        })
    })
}