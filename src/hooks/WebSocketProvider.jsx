import React, { createContext, useContext} from "react";
import webSocketInstance from "./WebSocketService";

const WebSocketContext = createContext(null);

export const WebSocketProvider = ({ children }) => {


    return (
        <WebSocketContext.Provider value={webSocketInstance}>
            {children}
        </WebSocketContext.Provider>
    );
};

export const useWebSocket = () => useContext(WebSocketContext);
