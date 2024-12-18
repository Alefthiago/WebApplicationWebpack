$(document).ready(function () {

    $form = $('#formCep');
    $form.submit(function (e) {
        e.preventDefault();

        let cep = $('#cep').val().replace(/\D/g, '');
        if (cep.length === 8) {
            $.ajax({
                url: `https://viacep.com.br/ws/${cep}/json/`,
                method: 'GET',
                dataType: 'json',
                success: function (data) {
                    if (!data.erro) {
                        $('#tabela-dados').html(`
                                    <tr>
                                        <td>${data.cep}</td>
                                        <td>${data.logradouro}</td>
                                        <td>${data.bairro}</td>
                                        <td>${data.localidade}</td>
                                        <td>${data.uf}</td>
                                    </tr>
                                `);
                    } else {
                        alert("CEP não encontrado. Verifique e tente novamente.");
                    }
                },
                error: function () {
                    alert("Ocorreu um erro ao consultar o CEP.");
                }
            });
        } else {
            alert("Cep invalido")
        }
    });

});