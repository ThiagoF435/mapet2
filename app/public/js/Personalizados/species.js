var _species = function () {
    var app = this,
        objEdicao = null,
        BtnAcoes =
            `<i class='fas fa-trash-alt' onclick='species.excluir($(this).parents(2))' style='font-size: 16px; cursor: pointer' data-toggle='tooltip' data-placement='bottom' title='Excluir'></i>` +
            `<i class='fas fa-pencil ml-1' onclick='species.editarItem($(this).parents(2))' style='font-size: 16px; cursor: pointer' data-toggle='tooltip' data-placement='bottom' title='Baixar'></i>`,
        table = $('#tbl-itens').DataTable({
            language: {
                url: "//cdn.datatables.net/plug-ins/1.10.20/i18n/Portuguese-Brasil.json"
            },
            columnDefs: [
                { targets: [0], orderable: false },
                { targets: [2], visible: false },
                { targets: [0, 1], className: 'dt-center' }
            ],
            //JESSICA: TERIA QUE PUXAR OS DADOS DO BANCO DO CLIENTE E LISTAR AQUI PASSANDO PARA TABLE
            //ajax: {
            //    url: '/Funcionario/Listar',
            //    headers: {
            //        'X-XSRF-TOKEN': getCookie('app.advanced.com.br')
            //    },
            //    dataSrc: ''
            //},
            columns: [
                { data: "BtnAcoes" },
                { data: "nome_especie" },
                { data: "id_especie" }
            ],
            order: [2, 'asc'],
            info: true,
            paging: true,
            autoWidth: true,
            scrollX: true,
            select: false
        });

    app.editarItem = function (obj) {
        const data = table.row(obj).data();
        //JESSICA: TERIA QUE PUXAR OS DADOS DO BANCO DO CLIENTE E EXIBIR NOVAMENTE NOS CAMPOS DO INPUT PERMITINDO A ALTERA��O
        //$.Ajax({
        //    url: `/Cliente/Obter/${data.ID}`,
        //    data: '',
        //    processing: true,
        //    toast: false,
        //    onSuccess: function (data) {
        //        objEdicao = data;
        //        $.each(data, function (indexInArray, valueOfElement) {
        //            $(`#${indexInArray}`).val(valueOfElement);
        //        });
        //    }
        //});
        $('#submit').show();
    };

    var inicializarComponentes = function () {
        $('#btn-incluir-header').click(function () {
            IDX_TABELA = null;
            location.href = `especies/cadastrar`
        });
    }

    $(function () {
        inicializarComponentes();       
    });
}
var species = new _species();