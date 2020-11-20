module.exports = function(app) {
    app.get('/racas/cadastrar', function(req, res) {
        app.app.controllers.racas.cadastrar(app, req, res)
    })

    app.post('/racas/salvar_cadastro', function(req, res) {
        app.app.controllers.racas.salvarCadastro(app, req, res)
    })

    app.get('/racas/deletar', function(req, res) {
        app.app.controllers.racas.deletar(app, req, res)
    })

    app.get('/racas/editar', function(req, res) {
        app.app.controllers.racas.editar(app, req, res)
    })

    app.get('/racas/visualizar', function(req, res) {
        app.app.controllers.racas.visualizar(app, req, res)
    })

    app.post('/racas/salvar_edicao', function(req, res) {
        app.app.controllers.racas.salvarEdicao(app, req, res)
    })

    app.get('/racas/listar', function(req, res) {
        app.app.controllers.racas.listar(app, req, res)
    })

    app.post('/racas/pesquisar', function(req, res) {
        app.app.controllers.racas.pesquisar(app, req, res)
    })
}