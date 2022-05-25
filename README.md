# websocket
Websocket server and client in Derw

## Client

The client is built around the API of constructing a connection with callbacks for `onOpen` / `onMessage`. You get back a `Connection`, which can be used to directly call websocket methods from the WebSocket class, however I recommend using the callbacks for the majority of processing.

```elm
type alias Socket msg = {
    url: string,
    onOpen: void -> msg,
    onMessage: string -> msg
}
```

```
type alias Connection = {
    socket: WebSocket
}

connect: Socket msg -> Connection
```

## Server

The server is a wrapped around the `ws` package from Node, again built around callbacks: `onConnection` and `onMesssage`. These can be used with the `Response` union type to define responses to events from client connections: either wait, or send something in response.

```elm
type alias WebsocketSettings = {
    port: number,
    onConnection: Connection -> Response,
    onMessage: Connection -> string -> Response
}

type Response = Send { message: string } | Wait
```

It's possible to send a message to a connection without waiting, through `send: Connection -> string -> void`.

## Running the example

See the example folder on how to use.

```bash
cd example
derw install
derw compile
derw bundle --entry src/Client.derw --output build.js
```

Then in two separate terminal sessions:

```bash
# open localhost://8000
python3 -m http.server
```

```bash
ts-node src/Server.ts
```