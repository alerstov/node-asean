$(document).ready(function() {

    $("#send_button").click(function() {
        var mes = $("#text")[0].value;

        $("#send_button").attr('disabled', 'disabled');
        $("#status").html('sending...');

        $.post('/push_message', {
            message: mes
        }, function(data) {
            setTimeout(function() {
                $("#status").html('ok');
                $("#send_button").removeAttr('disabled');
            }, 1000);
        }).fail(function(jqXHR, text) {
            $("#status").html(text);
            $("#send_button").removeAttr('disabled');
        });
    });

    $("#clear_button").click(function() {
        $.post('/remove_tokens', function(data) {
            window.location.reload();
        }).fail(function(jqXHR, text) {
            console.log(text);
        });
    });

    $("#add_button1").click(function() {
        $.post('/create_token', {
            id: 'fe5a4c15b9fe1ebdb71759ce7ac322b4e82604c1d60fc44dee2790648c77e9a2'
        }, function(data) {
            window.location.reload();
        }).fail(function(jqXHR, text) {
            console.log(text);
        });
    });

    $("#add_button2").click(function() {
        $.post('/create_token', {
            id: 'fb70ec9831d2f13f914e94c9c1162b355d8ab58b0762d0d6f1aa91f7374d04a5'
        }, function(data) {
            window.location.reload();
        }).fail(function(jqXHR, text) {
            console.log(text);
        });
    });
});