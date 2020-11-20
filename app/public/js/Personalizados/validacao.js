function validateFormUsuario() {
    var email = document.forms['form']['email'].value
    if(email.length > 40) {
        alert('O email do usuário deve conter menos de 40 caracteres!')
        return false
    }

    var senha = document.forms['form']['senha'].value
    if(senha.length > 20) {
        alert('A senha do usuário deve conter menos de 20 caracteres!')
        return false
    }

    var nome = document.forms['form']['nome'].value
    if(nome.length > 100) {
        alert('O nome do usuário deve conter menos de 100 caracteres!')
        return false
    }


    var rg = document.forms['form']['rg'].value
    if(rg.length != 9) {
        alert('O rg do usuário deve conter 9 caracteres!')
        return false
    }

    var cpf = document.forms['form']['cpf'].value
    if(!TestaCPF(cpf)) {
        alert('O cpf do usuário é inválido!')
        return false
    }

    var cargo = document.forms['form']['cargo'].value
    if(cargo.length > 40) {
        alert('O cargo do usuário deve conter menos de 40 caracteres!')
        return false
    }

    var telefone = document.forms['form']['telefone'].value
    if(telefone.length < 10 || telefone.length > 11) {
        alert('O telefone do usuário é inválido!')
        return false
    }
}

function validateFormCliente() {
    var email = document.forms['form']['email'].value
    if(email.length > 40) {
        alert('O email do cliente deve conter menos de 40 caracteres!')
        return false
    }

    var nome = document.forms['form']['nome'].value
    if(nome.length > 100) {
        alert('O nome do cliente deve conter menos de 100 caracteres!')
        return false
    }

    var rg = document.forms['form']['rg'].value
    if(rg.length != 9) {
        alert('O rg do cliente deve conter 9 caracteres!')
        return false
    }

    var cpf = document.forms['form']['cpf'].value
    if(!TestaCPF(cpf)) {
        alert('O cpf do cliente é inválido!')
        return false
    }

    var telefone = document.forms['form']['telefone'].value
    if(telefone.length < 10 || telefone.length > 11) {
        alert('O telefone do cliente é inválido!')
        return false
    }
}

function validateFormAnimal() {
    var nome = document.forms['form']['nome'].value
    if(nome.length > 40) {
        alert('O nome do pet deve conter menos de 40 caracteres!')
        return false
    }
}

function validateFormEspecie() {
    var nome = document.forms['form']['nome_especie'].value
    if(nome.length > 40) {
        alert('O nome da espécie deve conter menos de 40 caracteres!')
        return false
    }
}

function validateFormRaca() {
    var nome = document.forms['form']['nome_raca'].value
    if(nome.length > 40) {
        alert('O nome da raça deve conter menos de 40 caracteres!')
        return false
    }
}

function validateFormAgenda() {
    var motivo = document.forms['form']['motivo'].value
    if(motivo.length > 100) {
        alert('O motivo da consulta deve conter menos de 100 caracteres!')
        return false
    }
}

function validateFormHistorico() {
    var descricao = document.forms['form']['descricao'].value
    if(descricao.length > 500) {
        alert('A descrição da consulta deve conter menos de 500 caracteres!')
        return false
    }

    var diagnostico = document.forms['form']['diagnostico'].value
    if(diagnostico.length > 100) {
        alert('O diagnóstico da consulta deve conter menos de 100 caracteres!')
        return false
    }

    var vacina = document.forms['form']['vacina'].value
    if(vacina.length > 100) {
        alert('As vacinas da consulta devem conter menos de 100 caracteres!')
        return false
    }

    var remedio = document.forms['form']['remedio'].value
    if(remedio.length > 100) {
        alert('Os remédios da consulta devem conter menos de 100 caracteres!')
        return false
    }

    var conclusao = document.forms['form']['conclusao'].value
    if(conclusao.length > 100) {
        alert('A conclusão da consulta deve conter menos de 100 caracteres!')
        return false
    }
}

function validateFormEditarSenha() {
    var senhaAntiga = document.forms['form']['senhaAntiga'].value
    if(senhaAntiga.length > 20) {
        alert('A senha antiga pode conter somente 20 caracteres!')
        return false
    }

    var novaSenha = document.forms['form']['novaSenha'].value
    if(novaSenha.length > 20) {
        alert('A senha nova pode conter somente 20 caracteres!')
        return false
    }

    var confirmarNovaSenha = document.forms['form']['confirmarNovaSenha'].value
    if(confirmarNovaSenha.length > 20) {
        alert('A senha nova pode conter somente 20 caracteres!')
        return false
    }
}

function TestaCPF(strCPF) {
    var Soma;
    var Resto;
    Soma = 0;
if (strCPF == '00000000000') return false;

for (i=1; i<=9; i++) Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (11 - i);
Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11))  Resto = 0;
    if (Resto != parseInt(strCPF.substring(9, 10)) ) return false;

Soma = 0;
    for (i = 1; i <= 10; i++) Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (12 - i);
    Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11))  Resto = 0;
    if (Resto != parseInt(strCPF.substring(10, 11) ) ) return false;
    return true;
}