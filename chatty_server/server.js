const express = require('express');
const SocketServer = require('ws').Server;
const uuidv4 = require('uuid/v4');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
    // Make the express server serve static assets (html, javascript, css) from the /public folder
    .use(express.static('public'))
    .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on port ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
// wss.broadcast = data => 
wss.broadcast = function broadcast(incomingPost) {
    wss.clients.forEach(function each(client) {
        client.send(incomingPost);
    });
};

wss.on('connection', (ws) => {
    const numOfUsers = {
        type: "connection",
        count: wss.clients.size
    }

    wss.broadcast(JSON.stringify(numOfUsers));

    console.log("connection", numOfUsers.count)


    ws.on('message', (message) => {
        const post = JSON.parse(message).data;
        post.id = uuidv4();
        post.type = "incomingMessage";

        if (post.type === "postMessage") {
            post.type = "incomingMessage"
        }

        if (post.type === "postNotification") {
            post.type = "incomingNotification"
        }

        const incomingPost = JSON.stringify(post);
        wss.broadcast(incomingPost)

    })

    // Set up a callback for when a client closes the socket. This usually means they closed their browser.
    ws.on('close', () => {
        console.log('Client disconnected')
        const numOfUsers = {
            type: "disconnection",
            count: wss.clients.size
        }
        wss.broadcast(JSON.stringify(numOfUsers));
        console.log("disconnection", numOfUsers.count);
    });
});