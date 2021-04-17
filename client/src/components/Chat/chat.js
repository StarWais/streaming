import { Grid, Paper, Button, TextField, Typography } from '@material-ui/core';
import io from 'socket.io-client';
import { useEffect, useState, useRef } from 'react';

export default function Chat({ id }) {
  const [userName, setUserName] = useState(
    localStorage.getItem('username') || ''
  );
  const socketRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const [openTextField, setOpenTextField] = useState(false);
  const [textFieldValue, setTextFieldValue] = useState('');
  const [messageValue, setMessageValue] = useState('');
  const [users, setUsers] = useState([]);
  const helper = (count) => +count.toString().slice(-1) !== 1;
  const handleUserNameChange = () => {
    setUserName(textFieldValue);
    localStorage.setItem('username', textFieldValue);
    setOpenTextField(false);
    socketRef.current.emit('enterChat', {
      chatId: id,
      username: textFieldValue,
    });
  };
  const handleSendMessage = () => {
    socketRef.current.emit('sendMessage', {
      chatId: id,
      username: userName,
      message: messageValue,
    });
  };
  useEffect(() => {
    socketRef.current = io('http://localhost:5000', {
      transport: ['websocket'],
      query: `id=${id}`,
    });

    if (userName) {
      socketRef.current.emit('enterChat', { chatId: id, username: userName });
    }

    socketRef.current.emit('getMessagesAndUsers', { chatId: id });

    socketRef.current.on('update', (msgs) => {
      setMessages(msgs);
    });
    socketRef.current.on('updateUsers', (data) => {
      console.dir(data);
      setUsers(data);
    });
    return () => {
      if (userName) {
        socketRef.current.emit('leaveChat', { chatId: id, username: userName });
      }

      socketRef.current.disconnect();
    };
  }, [id]);
  return (
    <Grid container direction="column">
      {!userName && (
        <Grid item>
          <Button
            variant="contained"
            onClick={() => setOpenTextField(!openTextField)}
          >
            Choose username
          </Button>
        </Grid>
      )}
      {userName && (
        <Grid item container>
          <Grid item>
            <Typography variant="h6" align="center">
              Logged in as {userName}
            </Typography>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              onClick={() => {
                socketRef.current.emit('leaveChat', {
                  chatId: id,
                  username: userName,
                });
                setUserName('');
                localStorage.removeItem('username');
              }}
            >
              Log out
            </Button>
          </Grid>
        </Grid>
      )}
      {users.length > 0 && (
        <Grid item>
          <Typography variant="h6" align="center">
            There {helper(users.length) ? 'are' : 'is'} {users.length} user
            {helper(users.length) ? 's' : ''} in chat
          </Typography>
        </Grid>
      )}
      {openTextField && (
        <Grid item container direction="row">
          <Grid item>
            <TextField
              value={textFieldValue}
              onChange={(e) => {
                // if (e.target.value < 10) {
                setTextFieldValue(e.target.value);
                // }
              }}
            >
              Choose username
            </TextField>
          </Grid>
          <Grid item>
            <Button variant="contained" onClick={handleUserNameChange}>
              Change username
            </Button>
          </Grid>
        </Grid>
      )}
      {messages.length === 0 && (
        <Grid item>
          <Typography variant="h5" align="center">
            No messages availiable
          </Typography>
        </Grid>
      )}
      {messages.length > 0 && (
        <Grid item container direction="column">
          {messages.map((message) => (
            <Grid item key={message._id}>
              {message.username} : {message.message}
            </Grid>
          ))}
        </Grid>
      )}
      {userName && (
        <Grid item container direction="row">
          <Grid item>
            <TextField
              value={messageValue}
              onChange={(e) => {
                setMessageValue(e.target.value);
              }}
            >
              Type message
            </TextField>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              onClick={handleSendMessage}
              disabled={messageValue === '' || messageValue === ' '}
            >
              Send message
            </Button>
          </Grid>
        </Grid>
      )}
    </Grid>
  );
}
