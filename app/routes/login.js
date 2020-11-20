module.exports = function(app) {
    app.get('/', function(req, res) {
        app.app.controllers.login.login(app, req, res)
    })

    app.post('/login/iniciar_sessao', function(req, res) {
        app.app.controllers.login.iniciarSessao(app, req, res)
    })

    app.get('/erro', function(req, res) {
        app.app.controllers.login.erro(app, req, res)
    })

    app.get('/deslogar', function(req, res) {
        app.app.controllers.login.deslogar(app, req, res)
    })

    app.get('/login/recuperar_senha', function(req, res) {
        app.app.controllers.login.recuperarSenha(app, req, res)
    })

    app.post('/login/recuperar_senha_enviar', function(req, res) {
        app.app.controllers.login.recuperarSenhaEnviar(app, req, res)
    })
}