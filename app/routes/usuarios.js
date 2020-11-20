module.exports = function(app) {
    app.get('/usuarios/cadastrar', function(req, res) {
        app.app.controllers.usuarios.cadastrar(app, req, res)
    })

    app.post('/usuarios/salvar_cadastro', function(req, res) {
        app.app.controllers.usuarios.salvarCadastro(app, req, res)
    })

    app.get('/usuarios/deletar', function(req, res) {
        app.app.controllers.usuarios.deletar(app, req, res)
    })

    app.get('/usuarios/editar', function(req, res) {
        app.app.controllers.usuarios.editar(app, req, res)
    })

    app.get('/usuarios/visualizar', function(req, res) {
        app.app.controllers.usuarios.visualizar(app, req, res)
    })

    app.post('/usuarios/salvar_edicao', function(req, res) {
        app.app.controllers.usuarios.salvarEdicao(app, req, res)
    })

    app.get('/usuarios/listar', function(req, res) {
        app.app.controllers.usuarios.listar(app, req, res)
    })

    app.post('/usuarios/pesquisar', function(req, res) {
        app.app.controllers.usuarios.pesquisar(app, req, res)
    })
}