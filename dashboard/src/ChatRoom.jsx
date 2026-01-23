import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addMessage } from './store/communitySlice';
import io from 'socket.io-client';

const socket = io('http://localhost:4000');

const ChatRoom = () => {
  const messages = useSelector(state => state.community.messages);
  const [messageInput, setMessageInput] = React.useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    socket.on('chat message', (msg) => {
      dispatch(addMessage(msg));
    });

    return () => { socket.off('chat message'); };
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (messageInput.trim()) {
      socket.emit('chat message', {
        text: messageInput,
        timestamp: new Date().toISOString()
      });
      setMessageInput('');
    }
  };

  return (
    <div className="chat-room">
      <div className="messages">
        {messages.map((msg, index) => (
          <div key={index} className="message">
            {msg.text}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
          placeholder="Type a message..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default ChatRoom;