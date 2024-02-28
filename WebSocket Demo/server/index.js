const WebSocket = require('ws');

const wss = new WebSocket.Server({port : 8082});

wss.on("connection", ws =>{
    console.log("client connected");

    ws.on("message", data => {
        console.log(`Client sent : ${data}`);
        ws.send("How are you?");
    });

    ws.on("close", () => {
        console.log("client disconnected");
    });
});