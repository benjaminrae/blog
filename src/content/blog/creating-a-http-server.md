# Create an Http Server from scratch

I think we are all very used to creating servers and using them. If you work in Node.js then I'm sure you are no stranger to Express. I was thinking, Express and similar frameworks hide a lot of "magic" from us, but how hard can it be to create a server from scratch?

I first did this exercise while learning Go. I did this by following the "Build your own HTTP server" challenge on codecrafters.io. Right now the challenge is free while the platform is in beta, so I highly recommend you check it out.

## TCP

The first thing I started looking at was TCP (Transmission Control Protocol). TCP is a protocol that allows data to be transfered over a network. It's the basis for most of the protocols that we know and use like HTTP, HTTPS, FTP, SMTP, etc.

TCP is a two-way communication protocol, meaning that the client and the server can send data to each other. It's also a connection-oriented protocol, meaning that the client and the server need to establish a connection before they can send data to each other. The connection is maintained until data transfer is complete.

Data is transfered using a stream of bytes and the structure of the data doesn't matter. That means that a Redis client can use TCP and a Http server too, but will use different protocols on top of TCP when it comes to interpreting and formatting the data which is sent and received.

Connections are established using a three-way handshake. First, a client initiated the connection with a SYN signal. The server then responds with a SYN-ACK signal. Finally, the client responds with an ACK signal. This is a very simplified explanation of the handshake, but it's enough for us to understand how to create a server.

Connections are closed with a four-way handshake. First, the client sends a FIN signal. The server then responds with a ACK signal. The server then sends a FIN signal. Finally, the client responds with a ACK signal.

There's a lot more to learn about TCP but this should be enough to get us started with creating our server.

## Creating a TCP server

Node gives us the 'net' module which we can use to create TCP servers. Let's create a simple TCP server that listens on port 8080 and logs the data that it receives.

```ts
import net from "node:net";

const server = net.createServer(socket => {
  socket.on("data", data => {
    console.log(data.toString());
  });
});

server.listen(8080, () => {
  console.log(`Server listening on port ${8080}`);
});
```

Then we can send a request to the server using curl.

```sh
curl http://localhsot:8000
```

Here's the output of the server.

```sh
Server listening on port 8080
GET / HTTP/1.1
Host: localhost:8080
User-Agent: curl/8.2.1
Accept: */*
```

If we hadn't used `toString()` on the data we would have seen the raw bytes that were sent to the server.

```sh
Server listening on port 8080
<Buffer 47 45 54 20 2f 20 48 54 54 50 2f 31 2e 31 0d 0a 48 6f 73 74 3a 20 6c 6f 63 61 6c 68 6f 73 74 3a 38 30 38 30 0d 0a 55 73 65 72 2d 41 67 65 6e 74 3a 20 ... 27 more bytes>
```

Okay so we have a simple TCP server that can receive data. Now we need to parse the data and send a response. Now this is, in my opinon, the first piece of magic that we get from frameworks like Express. Our controllers and middlewares in Express receive a request object and response object, so Express must be taking the raw data that the server receives and parsing it into a request object. Let's see how we can do that.

## Parsing the request

Let's revisit the stringified data that our server received

```sh
GET / HTTP/1.1
Host: localhost:8080
User-Agent: curl/8.2.1
Accept: */*
```

We can see that the first line is the request line. It contains the HTTP method, the path and the HTTP version. The next lines are the headers. Each header is separated by a new line and the header name and value are separated by a colon. Now, we don't have a request body yet so we can ignore that for now.

HTTP uses CRLF for it's end of line markers. So what we are actually receiving is this.

```sh
GET / HTTP/1.1\r\nHost: localhost:8080\r\nUser-Agent: curl/8.2.1\r\nAccept: */*\r\n\r\n
```

Since we know that each line represents something importante, we can use the CRLF to split the data into lines.

```ts
import net from "node:net";

const server = net.createServer(socket => {
  socket.on("data", data => {
    const requestLines = data.toString().split("\r\n");

    console.log(requestLines);
  });
});

server.listen(8080, () => {
  console.log(`Server listening on port ${8080}`);
});
```

Here's the output of the server.

```sh
Server listening on port 8080
[
  'GET / HTTP/1.1',
  'Host: localhost:8080',
  'User-Agent: curl/8.2.1',
  'Accept: */*',
  '',
  ''
]
```

So what we have now is the first line, with the method, path and version, the next lines with the headers and finally we have some blank lines. The blank lines are there because we have a request body, but we haven't sent it yet. We can ignore the blank lines for now.

Great we are making real progress, but let's take a step back and think about what we are trying to do. We are trying to parse the data that we receive into a request object. So let's create a request object.

```ts
export class Request {
  #protocol: string;
  #version: string;
  #method: string;
  #path: string;
  #originalUrl: string;
  #rawParams: string[];
  #rawQuery: string;
  #rawHeaders: string[];
  #rawBytes: Buffer;
  #rawString: string;

  constructor(rawRequest: Buffer) {
    this.#rawBytes = rawRequest;
    this.#rawString = rawRequest.toString();
  }
}
```

So here we have a start. We have a class that takes the raw request and stores it. We also store the raw string representation of the request. Now we need to start parsing the request.
