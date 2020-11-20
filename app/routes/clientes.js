module.exports = function(app) {
    app.get('/clientes/cadastrar', function(req, res) {
        app.app.controllers.clientes.cadastrar(app, req, res)
    })

    app.post('/clientes/salvar_cadastro', function(req, res) {
        app.app.controllers.clientes.salvarCadastro(app, req, res)
    })

    app.get('/clientes/deletar', function(req, res) {
        app.app.controllers.clientes.deletar(app, req, res)
    })

    app.get('/clientes/editar', function(req, res) {
        app.app.controllers.clientes.editar(app, req, res)
    })

    app.get('/clientes/visualizar', function(req, res) {
        app.app.controllers.clientes.visualizar(app, req, res)
    })

    app.post('/clientes/salvar_edicao', function(req, res) {
        app.app.controllers.clientes.salvarEdicao(app, req, res)
    })

    app.get('/clientes/listar', function(req, res) {
        app.app.controllers.clientes.listar(app, req, res)
    })

    app.post('/clientes/pesquisar', function(req, res) {
        app.app.controllers.clientes.pesquisar(app, req, res)
    })
}