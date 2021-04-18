import { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import useUser from '../hooks/useUser';

const useSocket = (serverUrl, chatId) => {
  const [users, setUsers] = useState([]);
  const { loggedIn, userName } = useUser();
  const [messages, setMessages] = useState([]);
  const socketRef = useRef(null);
  const sendMessage = (message) => {
    if (loggedIn) {
      socketRef.current.emit('sendMessage', {
        username: userName,
        message,
      });
    }
  };
  const enterChat = () => {
    socketRef.current.emit('enterChat', { username: userName });
  };
  const leaveChat = () => {
    socketRef.current.emit('leaveChat', { username: userName });
  };
  useEffect(() => {
    socketRef.current = io(serverUrl, {
      transport: ['websocket'],
      query: `id=${chatId}`,
    });
    socketRef.current.emit('getMessagesAndUsers');
    socketRef.current.on('update', (msg) => {
      const newMessage = { type: 'message', body: msg };
      setMessages([...messages, newMessage]);
    });
    socketRef.current.on('updateUsers', (data) => {
      setUsers(data);
    });
    socketRef.current.on('getMessages', (data) => {
      setMessages(data.map((message) => ({ type: 'message', body: message })));
    });
    socketRef.current.on('userEnteredChat', (data) => {
      const newMessage = {
        type: 'alert',
        body: `User ${data} entered chat`,
      };

      setMessages([...messages, newMessage]);
    });
    socketRef.current.on('userLeftChat', (data) => {
      const newMessage = {
        type: 'alert',
        body: `User ${data} left chat`,
      };
      setMessages([...messages, newMessage]);
    });
    return () => {
      if (loggedIn) {
        leaveChat();
      }
      socketRef.current.disconnect();
    };
  }, [chatId, serverUrl]);
  return {
    users,
    messages,
    sendMessage,
    socketRef,
    enterChat,
    leaveChat,
    alert,
  };
};

export default useSocket;
