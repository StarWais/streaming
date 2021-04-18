import { Grid, Paper, Button, TextField, Typography } from '@material-ui/core';
import { useEffect, useState } from 'react';
import styles from './styles';
import useSocket from '../../hooks/useSocket';
import useUser from '../../hooks/useUser';
import { httpServer } from '../../utils/server';

export default function Chat({ id }) {
  const classes = styles();
  const { logIn, logOut, loggedIn, userName } = useUser();
  const { sendMessage, users, messages, enterChat, leaveChat } = useSocket(
    httpServer,
    id
  );
  const [openTextField, setOpenTextField] = useState(false);
  const [textFieldValue, setTextFieldValue] = useState('');
  const [messageValue, setMessageValue] = useState('');
  const helper = (count) => +count.toString().slice(-1) !== 1;
  const handleUserNameChange = () => {
    setOpenTextField(false);
    logIn(textFieldValue);
  };
  useEffect(() => {
    if (loggedIn) {
      enterChat();
    }
  }, [loggedIn]);
  return (
    <Grid
      container
      direction="column"
      className={classes.chatWrapper}
      alignItems="center"
    >
      {!loggedIn && (
        <Grid item>
          <Button
            variant="contained"
            onClick={() => setOpenTextField(!openTextField)}
            className={classes.chooseButton}
          >
            Choose username
          </Button>
        </Grid>
      )}
      {loggedIn && (
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
                leaveChat();
                logOut();
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
            <Button
              variant="contained"
              onClick={handleUserNameChange}
              disabled={!textFieldValue || textFieldValue.includes(' ')}
            >
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
      {loggedIn && (
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
              onClick={() => sendMessage(messageValue)}
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
