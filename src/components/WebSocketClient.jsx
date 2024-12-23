import React, { useState, useEffect, useRef } from 'react';

export default function WebSocketClient() {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const webSocket = useRef(null);

  // Initialize WebSocket connection
  useEffect(() => {
    webSocket.current = new WebSocket('ws://localhost:7500/');

    // Handle incoming messages
    webSocket.current.onmessage = (event) => {
      setMessages((prevMessages) => [
        ...prevMessages,
        `Message from server: ${event.data}`,
      ]);
    };

    // Log connection status
    webSocket.current.addEventListener('open', () => {
      console.log('Client is now connected');
    });

    // Cleanup on component unmount
    return () => {
      webSocket.current.close();
    };
  }, []);

  // Handle message input change
  const handleChange = (event) => {
    setMessage(event.target.value);
  };

  // Send message to server
  const sendMessage = (event) => {
    event.preventDefault();
    if (webSocket.current.readyState === WebSocket.OPEN) {
      webSocket.current.send(message);
      setMessage(''); // Clear input
    } else {
      console.error('WebSocket is not connected.');
    }
  };

  return (
    <div className="p-4">
      <h2>WebSocket Client</h2>
      <form onSubmit={sendMessage} id="input-form" className="mb-4">
        <input
          type="text"
          id="message"
          value={message}
          onChange={handleChange}
          placeholder="Type your message..."
          className="border px-2 py-1"
        />
        <button type="submit" className="ml-2 px-4 py-1 bg-blue-500 text-white">
          Send
        </button>
      </form>
      <div id="messages" className="border p-4">
        <h3>Messages:</h3>
        {messages.map((msg, index) => (
          <p key={index}>{msg}</p>
        ))}
      </div>
    </div>
  );
}
