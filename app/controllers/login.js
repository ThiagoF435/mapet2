module.exports.login = function(app, req, res) {
    res.render('login/login', {erro : '', email : ''})
}

module.exports.iniciarSessao = function(app, req, res) {
    var conn = app.config.databaseConnection()
    var model = new app.app.models.UsuarioDAO(conn)
    var obj = req.body

    model.logar(obj, function(err, result) {
        if(err) throw err

        if(result[0]) {
            req.session.loggedin = true
            req.session.id_user = result[0].id_user
            req.session.email = result[0].email
            req.session.senha = result[0].senha
            req.session.nome = result[0].nome
            req.session.data_nasc = result[0].data_nasc
            req.session.rg = result[0].rg
            req.session.cpf = result[0].cpf
            req.session.cargo = result[0].cargo
            res.render('admin/admin')
        } else {
            res.render('login/login', {erro : '1', email : ''})
        }
    })
}

module.exports.erro = function(app, req, res) {
    res.render('login/erro')
}

module.exports.deslogar = function(app, req, res) {

    req.session.destroy(function(err) {
        if(err) throw err

        res.redirect('/')
    })
}

module.exports.recuperarSenha = function(app, req, res) {
    res.render('login/recuperar_senha', {erro : '', email : ''})

}

module.exports.recuperarSenhaEnviar = function(app, req, res) {
    var conn = app.config.databaseConnection()
    var model = new app.app.models.UsuarioDAO(conn)
    var obj = req.body

    model.verificarEmail(obj.email, function(err, result) {
        if(err) throw err

        if(result[0]) {
            var nodemailer = require('nodemailer')

            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                  user: 'atendimentomapet@gmail.com',
                  pass: 'mapet#12345'
                }
              })

            var mailOptions = {
                from: 'atendimentomapet@gmail.com',
                to: obj.email,
                subject: 'Recuperação de senha',
                text: 'Você esqueceu sua senha bobinho(a), tudo bem aqui está ela: ' + result[0].senha
            }

            transporter.sendMail(mailOptions, function(err, info) {
                if (err) {
                  console.log(err)
                } else {
                  console.log('Email enviado: ' + info.response)
                }
            })

            return res.render('login/login', {email : 'Um email foi enviado para você, verifique para recuperar sua senha!', erro : ''})
        
        } else {
            return res.render('login/recuperar_senha', {erro : 'Email não cadastrado!'})
        }
    })
}