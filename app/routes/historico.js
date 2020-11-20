module.exports = function(app) {
    app.get('/historico/cadastrar', function(req, res) {
        app.app.controllers.historico.cadastrar(app, req, res)
    })

    app.post('/historico/salvar_cadastro', function(req, res) {
        app.app.controllers.historico.salvarCadastro(app, req, res)
    })

    app.get('/historico/visualizar', function(req, res) {
        app.app.controllers.historico.visualizar(app, req, res)
    })

    app.get('/historico/listar', function(req, res) {
        app.app.controllers.historico.listar(app, req, res)
    })

    app.post('/historico/pesquisar', function(req, res) {
        app.app.controllers.historico.pesquisar(app, req, res)
    })

    app.get('/historico/relatorio', function(req, res) {
        app.app.controllers.historico.relatorio(app, req, res)
    })

    app.post('/historico/imprimir', function(req, res) {
        app.app.controllers.historico.imprimir(app, req, res)
    })
}