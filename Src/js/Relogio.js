$(document).ready(function () {
    function atualizarRelogio() {
        const agora = new Date();
        const horas = String(agora.getHours()).padStart(2, '0');
        const minutos = String(agora.getMinutes()).padStart(2, '0');
        const segundos = String(agora.getSeconds()).padStart(2, '0');

        const horario = `${horas}:${minutos}:${segundos}`;
        $('#relogio').text(horario);
    }

    atualizarRelogio();
    setInterval(atualizarRelogio, 500);
});