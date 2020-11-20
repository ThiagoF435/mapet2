module.exports = function(app) {
    app.get('/especies/cadastrar', function(req, res) {
        app.app.controllers.especies.cadastrar(app, req, res)
    })

    app.post('/especies/salvar_cadastro', function(req, res) {
        app.app.controllers.especies.salvarCadastro(app, req, res)
    })

    app.get('/especies/deletar', function(req, res) {
        app.app.controllers.especies.deletar(app, req, res)
    })

    app.get('/especies/editar', function(req, res) {
        app.app.controllers.especies.editar(app, req, res)
    })

    app.get('/especies/visualizar', function(req, res) {
        app.app.controllers.especies.visualizar(app, req, res)
    })

    app.post('/especies/salvar_edicao', function(req, res) {
        app.app.controllers.especies.salvarEdicao(app, req, res)
    })

    app.get('/especies/listar', function(req, res) {
        app.app.controllers.especies.listar(app, req, res)
    })

    app.post('/especies/pesquisar', function(req, res) {
        app.app.controllers.especies.pesquisar(app, req, res)
    })
}