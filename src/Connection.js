export default (() => {
    class Connection {
        connection = undefined;
        buffering = false;
        onoutput = output => {};
        lastLine = '';

        open(url, user, password) {
            this.connection = new WebSocket(url); // 'ws://portal.skotos.net:8080/tec'
            this.connection.onopen = () => {
                this.login(user, password)
            };
            this.connection.onerror = error => {
                console.log('On error', this.onoutput);
                this.onoutput('Connection error -- sorry.');
                console.log(error);
            };
        }

        parseIncoming = (event) => {
            let reader = new FileReader();
            reader.onload = () => {
                reader.result.split("\n").forEach(line => {
                    if (this.buffering) {
                        console.log('Buffering', line);
                        this.lastLine = line;
                    } else {
                        this.onoutput(line);
                    }
                });
            };
            reader.readAsText(event.data);
        };

        login(username, password) {
            this.buffering = true;
            this.connection.onmessage = (event) => {
                let reader = new FileReader();
                reader.onload = () => {
                    let line = reader.result.trim();

                    if (line.startsWith('SECRET')) {
                        console.log('Performing handshake.');
                        let secret = line.substring(7);
                        let hash = require("blueimp-md5")(username + password + secret);
                        this.connection.send("USER " + username + "\n");
                        this.connection.send('SECRET ' + secret + "\n");
                        this.connection.send('HASH ' + hash + "\n");
                        this.connection.send("CHAR \n");
                        this.connection.send("Nope\n");
                        this.buffering = false;
                        console.log('Switching to standard parsing.');
                        this.connection.onmessage = this.parseIncoming;
                    } else if (line.endsWith('Login:')) {
                        console.log('Asking for Zealotry protocol.');
                        this.connection.send("SKOTOS Zealous 0.7.12.2\n");
                    } else {
                        console.log('Confusion ensues: ', reader.result);
                    }
                };
                reader.readAsText(event.data);
            };
        };

        send(input) {
            let sent = false;

            if (this.connection.readyState === this.connection.OPEN) {
                this.connection.send(input);
                sent = true;
            }

            return sent;
        }
    }
    
    return Connection;
})();
