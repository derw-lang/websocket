import * as http from "http";
import { WebSocket, WebSocketServer } from "ws";
import { Response } from "./Server";

function internalSend(response: Response, socket: WebSocket): void {
    switch (response.kind) {
        case "Send": {
            socket.send(response.message);
            break;
        }
        case "Wait": {
            break;
        }
    }
}

export function connect(settings: any): WebSocketServer {
    const wss = new WebSocketServer(settings);

    wss.on("connection", (socket: WebSocket, request: http.IncomingMessage) => {
        const connection = {
            socket: socket,
            request: request,
        };
        internalSend(settings.onConnection(connection), socket);

        socket.on("message", (data) => {
            internalSend(
                settings.onMessage(connection, data.toString()),
                socket
            );
        });
    });

    return wss;
}
