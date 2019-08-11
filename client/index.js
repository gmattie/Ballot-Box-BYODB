const button = document.getElementById("button");
const message = document.getElementById("message"); 
const received = document.getElementById("received");

const connect = () => {

    const openWebSocket = (event) => {

        received.innerHTML += "<li>---CONNECTED---</li>";

        webSocket.addEventListener("close", closeWebSocket, { once: true });
        webSocket.addEventListener("message", messageWebSocket);
    };

    const errorWebSocket = (event) => {

        received.innerHTML += "<li>---ERROR---</li>";

        webSocket.close();
    };

    const closeWebSocket = (event) => {

        received.innerHTML += "<li>---DISCONNECTED---</li>";

        webSocket.removeEventListener("message", messageWebSocket);
        webSocket.close();
    };

    const messageWebSocket = (payload) => {

        received.innerHTML += "<li>" + payload.data + "</li>";
    };

    const webSocket = new WebSocket("ws://" + location.host);
    webSocket.addEventListener("open", openWebSocket, { once: true });
    webSocket.addEventListener("error", errorWebSocket, { once: true });

    button.addEventListener("click", (event) => {

        received.innerHTML += "<li>" + message.value + "</li>";
        webSocket.send(message.value);
    });    
};

connect();