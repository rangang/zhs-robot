const WebSocket = require('ws');

// 创建 WebSocket 服务器
const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws) => {
    console.log('Client connected');

    // 处理接收到的消息
    ws.on('message', (message) => {
        console.log(`Received: ${message}`);
        // 发送消息回客户端
        ws.send(`${message}`);
    });

    // 发送欢迎消息给新连接的客户端
    ws.send('Welcome to the WebSocket server!');
});

console.log('WebSocket server is running on ws://localhost:8080');
