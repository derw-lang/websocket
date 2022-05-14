# websocket
Websocket server and client in Derw

See the example folder on how to use.

## Running the example

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