module.exports = function(app) {
    app.get('/modulos', function(req, res) {
        app.app.controllers.admin.adminModulos(app, req, res)
    })
}