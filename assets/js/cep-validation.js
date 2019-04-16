(function( $ ) {
    'use strict';

    $(document).ready(function() {

        function limpa_formulário_cep() {
            // Limpa valores do formulário de cep.
            $("#billing_address_1").val("");
            $("#billing_address_2").val("");
            $("#billing_district").val("");
            $("#billing_city").val("");
            $("#billing_state").val("");

        }

        //Quando o campo cep perde o foco.
        $("#billing_postcode").blur(function() {

            //Nova variável "cep" somente com dígitos.
            var cep = $(this).val().replace(/\D/g, '');

            //Verifica se campo cep possui valor informado.
            if (cep != "") {

                //Expressão regular para validar o CEP.
                var validacep = /^[0-9]{8}$/;

                //Valida o formato do CEP.
                if(validacep.test(cep)) {

                    //Preenche os campos com "..." enquanto consulta webservice.
                    $("#billing_address_1").val("...");
                    $("#billing_address_2").val("");
                    $("#billing_district").val("...");
                    $("#billing_city").val("...");

                    //Consulta o webservice viacep.com.br/
                    $.getJSON("https://viacep.com.br/ws/"+ cep +"/json/?callback=?", function(dados) {

                        if (!("erro" in dados)) {
                            //Atualiza os campos com os valores da consulta.
                            $("#billing_address_1").val(dados.logradouro);
                            $("#billing_address_2").val("");
                            $("#billing_district").val(dados.bairro);
                            $("#billing_city").val(dados.localidade);
                            $("#billing_state").val(dados.uf).change();
                            $("#billing_address_number").focus();

                        } //end if.
                        else {
                            //CEP pesquisado não foi encontrado.
                            limpa_formulário_cep();
                            alert("CEP não encontrado.");
                        }
                    });
                } //end if.
                else {
                    //cep é inválido.
                    limpa_formulário_cep();
                    alert("Formato de CEP inválido.");
                }
            } //end if.
            else {
                //cep sem valor, limpa formulário.
                limpa_formulário_cep();
            }
        });
    });

}( jQuery ));