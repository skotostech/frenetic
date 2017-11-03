// TODO Make this into a true module by removing the markup specific portions.

import Map from './Map';
import StatusBars from './StatusBars';
import Compass from './Compass'
import Connection from './Connection';

$(function () {
    let map = new Map('.canvas.map');
    let statusBars = new StatusBars('.canvas.status');
    let compass = new Compass('.canvas.compass');
    let connection = undefined;
    let $login = $('.login');
    let $game = $('.game');
    let $output = $('.game .output');
    let $input = $('.game .input input');
    let credentials = {
        uname: undefined,
        pwd: undefined
    };

    let scrollOutput = () => {
        $output.scrollTop(1E10);
    };

    // Initialize the various UI elements.
    statusBars.update();
    compass.update();

    // TODO Refactor this into a new class on which callbacks can be set.
    let handleSkoot = function (skoot) {
        let parts = skoot.match(new RegExp(/SKOOT (\d+) (.*)/));
        let identifier = parts[1];
        let data = parts[2];

        switch (identifier) {
            case '8': // Status Bars
                let parts = data.split(',');
                statusBars.barValue(parts[0].toLowerCase(), parts[1]);
                break;
            case '7': // Compass
                data.match(new RegExp(/\w+,\w+/g)).forEach(function (pair) {
                    let parts = pair.split(',');
                    if (parts[1] === 'show') {
                        compass.light(parts[0]);
                    } else {
                        compass.dim(parts[0]);
                    }
                });
                break;
            case '6': // Map
                map.drawMap(data);
                break;
            case '10': // Links, or map exits
                map.drawLinks(data);
                break;
            default:
                console.log('Unknown Skoot', skoot, 'identifier', identifier, 'data', data);
                break;
        }
    };

    let connect = function (user, password) {
        $login.toggle();
        $game.toggle();

        $input.on('keypress', function (event) {
            if (event.which === 13) {
                if (connection.send($input.val() + "\n")) {
                    $input.val('');
                } else {
                    $output.append('Oops, the connection is gone. Reload the page.');
                    scrollOutput();
                    $input.prop('disabled', true);
                }
            }
        });

        let connection = new Connection;
        connection.onoutput = output => {
            if (output.trim().startsWith('SKOOT')) {
                handleSkoot(output);
            } else {
                if (output.length) {
                    $output.append(output + '<br>');
                    scrollOutput();
                }
            }
        };
        connection.open('ws://exposuresoftware.com:6010/tectest', user, password);
        return connection;
    };

    $('.login div.submit').on('click', function (event) {
        event.stopPropagation();
        event.preventDefault();

        credentials.uname = $('input[name="user"]').val();
        credentials.pwd = $('input[name="password"]').val();

        $.ajax({
            url: '/tec/login',
            method: 'POST',
            dataType: 'json',
            data: {
                uname: credentials.uname,
                pwd: credentials.pwd,
                _token: $('meta[name="csrf"]').data('token')
            }
        }).done(function () {
            connection = connect(credentials.uname, credentials.pwd);
        }).fail(function (response) {
            console.log(response);
        });
    });
    $('.login div.skip').on('click', function (event) {
        event.stopPropagation();
        event.preventDefault();

        connection = connect();
    });
    $('.macro.button').on('click', function (event) {
        connection.send('fe' + $(this).data('macro') + "\n");
    });
});
