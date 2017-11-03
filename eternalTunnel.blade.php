<html>
<head>
    <title>
        Browser Client for The Eternal City
    </title>
    <meta name="csrf" data-token="{{ csrf_token() }}">
    <script
            src="https://code.jquery.com/jquery-3.2.1.min.js"
            integrity="sha256-hwg4gsxgFZhOsEEamdOYGBf13FyQuiTwlAQgxVSNgt4="
            crossorigin="anonymous"></script>
    <script src="/js/md5.min.js"></script>
    <script type="text/javascript"
            src="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.13/semantic.min.js"></script>
    <script type="text/javascript" src="/js/client.js"></script>
    <link rel="stylesheet" type="text/css"
          href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.13/semantic.min.css">
    <style>
        body {
            padding: 2rem;
        }

        .container {
            width: 75%;
            margin: 10rem auto;
        }

        .login {
            text-align: center;
        }

        .game .output {
            border: 1px solid black;
            width: 100%;
            height: 20rem;
            overflow-y: scroll;
            padding: 0 1rem 1rem 1rem;
        }

        .game .input input {
            width: 100%;
        }

        .ui.grid > .row {
            padding-top: 0;
            padding-bottom: 0;
        }

        .ui.grid > .row > .left.side.column {
            background: url('http://www.skotos.net/TECGame/images/edgeleft.jpg') no-repeat;
            padding-left: 0;
            padding-right: 0;
        }

        .ui.grid > .row > .right.side.column {
            background: url('http://www.skotos.net/TECGame/images/edgeright.jpg') no-repeat;
            padding-left: 0;
            padding-right: 0;
        }
    </style>
</head>
<body>
<div class="ui padded grid">
    <div class="centered login row">
        <div class="ten wide column">
            <div class="ui attached info icon message">
                <i class="info icon "></i>
                <div class="content">
                    <div class="header">
                        This is temporary.
                    </div>
                    <p>
                        This form will only be required while testing on a domain other than
                        <code>skotos.net</code>.
                        Once moved this page can be inaccessible before authorization or can redirect based on
                        the
                        existence of proper cookies.
                    </p>
                </div>
            </div>
            <form method="post" action="/tec/login" class="ui attached fluid form segment">
                <div class="inline field">
                    <label>
                        Username:
                    </label>
                    <input type="text" name="user" placeholder="Skotos Account Name">
                </div>
                <div class="inline field">
                    <label>
                        Password:
                    </label>
                    <input type="password" name="password" placeholder="Skotos Account Password">
                </div>
                <div>
                    <div class="ui submit green button">Login</div>
                    <div class="ui skip yellow button">Skip Log In</div>
                </div>
            </form>
        </div>
    </div>
    <div class="game row" style="display: none;">
        <div class="two wide left side column">
            <div class="row">
                <div class="sixteen wide column">
                    <img src="http://www.skotos.net/TECGame/images/gamelogo.gif" title="The Eternal City Logo">
                </div>
            </div>
        </div>
        <div class="twelve wide center column">
            <div class="ui padded grid">
                <div class="row">
                    <div class="sixteen wide column">
                        <div class="output"></div>
                    </div>
                </div>
                <div class="row">
                    <div class="sixteen wide column">
                        <div class="ui fluid input">
                            <input type="text" name="input" title="Input">
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="two wide right side column">
            <div class="ui padded grid">
                <div class="row">
                    <div class="column">
                        <a href="http://www.topmudsites.com/cgi-bin/topmuds/rankem.cgi?id=scarlatc"
                           title="Vote for TEC on The MUD Connector">
                            <img src="http://www.skotos.net/games/eternal-city/artwork/votenow_btn.gif"
                                 alt="MUD Connector Voting Button">
                        </a>
                    </div>
                </div>
                <div class="row">
                    <div class="status column">
                        <canvas class="canvas status"></canvas>
                    </div>
                </div>
                <div class="row">
                    <div class="compass column">
                        <canvas class="canvas compass"></canvas>
                    </div>
                </div>
                <div class="row">
                    <div class="map column">
                        <canvas class="canvas map"></canvas>
                    </div>
                </div>
                <div class="row">
                    <div class="ui sixteen wide column buttons">
                        <div class="ui grid">
                            <div class="row">
                                <?php for ($i = 1; $i <= 15; $i++) { ?>
                                <div class="column">
                                    <button class="ui basic grey macro button" data-macro="<?php echo $i; ?>">
                                        M<?php echo $i; ?>
                                    </button>
                                </div>
                                <?php if ($i % 5 === 0) { ?>
                            </div>
                            <div class="row">
                                <?php } ?>
                                <?php } ?>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</body>
</html>
