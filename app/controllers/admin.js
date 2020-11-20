module.exports.adminModulos = function(app, req, res) {
    if(req.session.loggedin != true) {
        return res.redirect('/')
    }

    res.render('admin/admin')
}