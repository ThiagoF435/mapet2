var _employee = function () { 
    var inicializarComponentes = function () {
        $('#btn-cancelar').click(function () {
            IDX_TABELA = null;
            location.href = `usuarios/listar`
        });
    }

    $(function () {
        inicializarComponentes();       
    });
}
var employee = new _employee();