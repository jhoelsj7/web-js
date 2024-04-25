$(document).ready(function() {
    generateKeypad();
    updateDocNumberInput();
    reloadCaptcha();

    $('#docType').change(updateDocNumberInput);

    function generateKeypad() {
        const keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
        keys.sort(() => Math.random() - 0.5);
        let keyboardHtml = '';
        keys.forEach((key, index) => {
            if (index % 3 === 0) keyboardHtml += '<tr>';
            keyboardHtml += `<td class="keypad-button">${key}</td>`;
            if ((index + 1) % 3 === 0) keyboardHtml += '</tr>';
        });
        keyboardHtml += '<tr><td class="keypad-button"><i class="fas fa-backspace"></i></td><td colspan="2" class="keypad-button"><i class="fas fa-sync-alt"></i></td></tr>';
        $('#keypad').html(keyboardHtml);
        attachKeypadHandlers();
    }

    function attachKeypadHandlers() {
        $('#keypad td').click(function() {
            var number = $(this).text().trim();
            var currentVal = $('#password').val();
            if ($(this).find('.fa-backspace').length > 0) {
                $('#password').val(currentVal.slice(0, -1));
            } else if ($(this).find('.fa-sync-alt').length > 0) {
                $('#password').val('');
                generateKeypad();
            } else {
                if (currentVal.length < 6) {
                    $('#password').val(currentVal + number);
                }
            }
        });
    }

    function updateDocNumberInput() {
        var docType = $('#docType').val();
        var maxLen = (docType === 'DNI') ? 8 : 12; // Assume DNI = 8 digits, CE = 12 digits
        $('#docNumber').attr('maxlength', maxLen);
        $('#cardNumber').attr('maxlength', 16);
    }

    function reloadCaptcha() {
        var possibleChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        var captcha = "";
        for (var i = 0; i < 5; i++) {
            captcha += possibleChars.charAt(Math.floor(Math.random() * possibleChars.length));
        }
        $('#captchaDisplay').css('opacity', '0');
        setTimeout(function() {
            $('#captchaDisplay').text(captcha).css('opacity', '1');
            sessionStorage.setItem('captcha', captcha);
        }, 500);
    }

    $('#reloadCaptcha').click(reloadCaptcha);

    $('#loginForm').submit(function(event) {
        event.preventDefault();
        if ($('#captchaInput').val() !== sessionStorage.getItem('captcha')) {
            $('#captchaInput').val('');
            alert("CAPTCHA incorrecto. Por favor, intente de nuevo.");
            reloadCaptcha();
        } else {
            alert("Formulario enviado. Verificar los datos antes de enviar al servidor.");
        }
    });

    $('#docNumber, #cardNumber').on('input', function() {
        this.value = this.value.replace(/\D/g, ''); // Removes any character that is not a digit
    });
});

