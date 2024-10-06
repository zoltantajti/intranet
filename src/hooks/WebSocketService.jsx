import MyStorage from "../utils/mystorage";

class WebSocketService {
    constructor(url){
        this.url = url;
        this.socket = null;
        this.reconnectDelay = 2000;
        this.onMessageCallback = null;
    }

    user = MyStorage.session.get('user');
    state = '';

    initialize(onMessage, onModal){
        this.onMessageCallback = onMessage;
        this.onModalCallback = onModal;
    }

    connect(){
        if(this.socket) { return; };
        if(!this.user?.id) { return; };

        this.socket = new WebSocket(this.url);
        this.socket.onopen = () => {
            this.socket.send(JSON.stringify({userID: this.user.id, userName: this.user.username}));
            this.state = 'connected';
        }
        this.socket.onclose = () => {
            this.state = 'disconnected';
            if(this.onModalCallback) this.onModalCallback({
                status: 'OFFLINE',
                text: 'A szerver offline módba került!<br/><br/>Újracsatlakozáshoz nyomd meg az <b>"F5" billentyűt</b>,<br/>vagy az "<b>Újracsatlakozás</b>" gombot!'
            });
        }
        this.socket.onerror = (error) => {
            console.error(error);
        }
        this.socket.onmessage = (message) => {
            if(this.onMessageCallback) this.onMessageCallback(message.data);
        }
    }

    disconnect() {
        if(this.socket){
            this.socket.close();
            this.socket = null;
        };
    }

    reconnect() {
        console.warn('Attempting to reconnect...');
        this.disconnect();
        this.connect();
    }

    sendMessage(message) {
        if(this.socket && this.socket.readyState === WebSocket.OPEN) {
            this.socket.send(message);
        }else{
            console.warn("Websocket is not open!");
        }
    }
}

const webSocketInterface = new WebSocketService("ws://intranet:8080");
export default webSocketInterface;