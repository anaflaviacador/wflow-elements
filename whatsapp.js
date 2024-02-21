jQuery(document).ready(function ($) {
    var afcwd_Whaaa = $('#afc_btwhats'),
        afcwd_BTWhaaa = $('#afc_btwhats > button'),
        afcwd_BTWhaaa_Avulso = $('.bt-abrir-wts'),
        afcwd_StatusWhaaa = $('#afc_btwhats_status'),
        afcwd_formWhaaa = $('input#afc_btwhats_box_form_escrever'),
        afcwd_formWhaaa_link = $('a#afc_btwhats_box_form_mandar'),
        afcwd_SaudacoesWhaaa = $('#afc_btwhats_box_saudacoes'),
        afcwd_ChamadaWhaaa = $('#afc_btwhats_box_chamada'),
        afcwd_Fuso = afcwd_Whaaa.data('whats-fuso'),
        afcwd_PTDate = new Date(new Date().toLocaleString("en-US", { timeZone: afcwd_Fuso })),
        afcwd_PTHour = afcwd_PTDate.getHours(),
        afcwd_PTDay = afcwd_PTDate.getDay(),

        afcwd_horaInicio = afcwd_Whaaa.data('whats-hr-inicio'),
        afcwd_horaFim = afcwd_Whaaa.data('whats-hr-fim'),

        afcwd_FraseON = afcwd_SaudacoesWhaaa.data('whats-saudacoes-on'),
        afcwd_FraseOFF = afcwd_SaudacoesWhaaa.data('whats-saudacoes-off'),
        afcwd_FraseFDS = afcwd_SaudacoesWhaaa.data('whats-saudacoes-fds'),

        afcwd_DescON = afcwd_ChamadaWhaaa.data('whats-descricao-on'),
        afcwd_DescOFF = afcwd_ChamadaWhaaa.data('whats-descricao-off'),
        afcwd_DescFDS = afcwd_ChamadaWhaaa.data('whats-descricao-fds'),

        afcwd_Numero = afcwd_formWhaaa_link.data('whats-numero');

    if (afcwd_Whaaa.length > 0) {
        afcwd_BTWhaaa_Avulso.click(function () {
            afcwd_Whaaa.addClass('afc_onclick');
        });
        afcwd_BTWhaaa.on('click', function (event) {
            afcwd_Whaaa.toggleClass('afc_onclick');
        });
        afcwd_formWhaaa.keyup(function () {
            var value = $(this).val();
            afcwd_formWhaaa_link.attr('href', 'https://api.whatsapp.com/send?phone=' + afcwd_Numero + '&text=' + value);
        }).keyup();

        if (afcwd_PTHour >= afcwd_horaInicio && afcwd_PTHour < afcwd_horaFim && afcwd_PTDay > 0 && afcwd_PTDay < 6) {
            afcwd_StatusWhaaa.removeClass('off').addClass('on');
            afcwd_SaudacoesWhaaa.append(afcwd_FraseON);
            afcwd_ChamadaWhaaa.append(afcwd_DescON);

        } else {

            afcwd_StatusWhaaa.removeClass('on').addClass('off');

            if (afcwd_PTDay === 0 || afcwd_PTDay === 6) {
                afcwd_SaudacoesWhaaa.append(afcwd_FraseFDS);
                afcwd_ChamadaWhaaa.append(afcwd_DescFDS);
            } else {
                afcwd_SaudacoesWhaaa.append(afcwd_FraseOFF);
                afcwd_ChamadaWhaaa.append(afcwd_DescOFF);
            }

        }

        // console.log(afcwd_horaInicio);
        // console.log(afcwd_horaFim);
        // console.log(afcwd_Numero);
        // console.log(afcwd_Fuso);
        // console.log(afcwd_PTDate);
        // console.log(afcwd_FraseON);
        // console.log(afcwd_FraseFDS);
        // console.log(afcwd_FraseOFF);

    }
});