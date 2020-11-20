module.exports = function(app) {
    app.get('/animais/cadastrar', function(req, res) {
        app.app.controllers.animais.cadastrar(app, req, res)
    })

    app.post('/animais/cadastrar2', function(req, res) {
        app.app.controllers.animais.cadastrar2(app, req, res)
    })

    app.post('/animais/salvar_cadastro', function(req, res) {
        app.app.controllers.animais.salvarCadastro(app, req, res)
    })

    app.get('/animais/deletar', function(req, res) {
        app.app.controllers.animais.deletar(app, req, res)
    })

    app.get('/animais/editar', function(req, res) {
        app.app.controllers.animais.editar(app, req, res)
    })

    app.get('/animais/visualizar', function(req, res) {
        app.app.controllers.animais.visualizar(app, req, res)
    })

    app.post('/animais/salvar_edicao', function(req, res) {
        app.app.controllers.animais.salvarEdicao(app, req, res)
    })

    app.get('/animais/listar', function(req, res) {
        app.app.controllers.animais.listar(app, req, res)
    })

    app.post('/animais/pesquisar', function(req, res) {
        app.app.controllers.animais.pesquisar(app, req, res)
    })
}