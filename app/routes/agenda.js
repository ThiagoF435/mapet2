module.exports = function(app) {
    app.get('/agenda/cadastrar', function(req, res) {
        app.app.controllers.agenda.cadastrar(app, req, res)
    })

    app.post('/agenda/cadastrar2', function(req, res) {
        app.app.controllers.agenda.cadastrar2(app, req, res)
    })

    app.post('/agenda/salvar_cadastro', function(req, res) {
        app.app.controllers.agenda.salvarCadastro(app, req, res)
    })

    app.get('/agenda/deletar', function(req, res) {
        app.app.controllers.agenda.deletar(app, req, res)
    })

    app.get('/agenda/editar', function(req, res) {
        app.app.controllers.agenda.editar(app, req, res)
    })

    app.get('/agenda/editarData', function(req, res) {
        app.app.controllers.agenda.editarData(app, req, res)
    })

    app.get('/agenda/visualizar', function(req, res) {
        app.app.controllers.agenda.visualizar(app, req, res)
    })

    app.post('/agenda/salvar_edicao', function(req, res) {
        app.app.controllers.agenda.salvarEdicao(app, req, res)
    })

    app.post('/agenda/salvar_edicao_data', function(req, res) {
        app.app.controllers.agenda.salvarEdicaoData(app, req, res)
    })

    app.get('/agenda/listar', function(req, res) {
        app.app.controllers.agenda.listar(app, req, res)
    })

    app.post('/agenda/pesquisar', function(req, res) {
        app.app.controllers.agenda.pesquisar(app, req, res)
    })

    app.post('/agenda/pesquisar_hoje', function(req, res) {
        app.app.controllers.agenda.pesquisarHoje(app, req, res)
    })

    app.post('/agenda/pesquisar_mes', function(req, res) {
        app.app.controllers.agenda.pesquisarMes(app, req, res)
    })

    app.get('/agenda/compareceu_sim', function(req, res) {
        app.app.controllers.agenda.compareceuSim(app, req, res)
    })

    app.get('/agenda/compareceu_nao', function(req, res) {
        app.app.controllers.agenda.compareceuNao(app, req, res)
    })
}