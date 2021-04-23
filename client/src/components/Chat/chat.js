import {
  Grid,
  IconButton,
  Button,
  TextField,
  Typography,
  Input,
  Dialog,
  DialogTitle,
  DialogContent,
} from '@material-ui/core';
import { useEffect, useState } from 'react';
import SendIcon from '@material-ui/icons/Send';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import styles from './styles';
import useSocket from '../../hooks/useSocket';
import useUser from '../../hooks/useUser';
import { httpServer } from '../../utils/server';
import Message from './Message';

export default function Chat({ id }) {
  const classes = styles();
  const { logIn, logOut, loggedIn, userName } = useUser();
  const {
    sendMessage,
    users,
    messages,
    enterChat,
    leaveChat,
    socketRef,
  } = useSocket(httpServer, id);
  const [openDialog, setOpenDialog] = useState(false);
  const [textFieldValue, setTextFieldValue] = useState('');
  const [messageValue, setMessageValue] = useState('');
  const helper = (count) => +count.toString().slice(-1) !== 1;
  const handleUserNameChange = () => {
    setOpenDialog(false);
    logIn(textFieldValue);
    setTextFieldValue('');
  };
  useEffect(() => {
    if (loggedIn) {
      enterChat();
    }
    return () => {
      if (loggedIn) {
        leaveChat();
      }
      socketRef.current.disconnect();
    };
  }, [loggedIn]);
  return (
    <>
      <Grid
        container
        direction="column"
        className={classes.chatWrapper}
        alignItems="center"
      >
        <Grid
          item
          container
          className={classes.header}
          justify={loggedIn ? 'space-between' : 'center'}
          alignItems="center"
        >
          {loggedIn && (
            <>
              <Grid
                item
                container
                className={classes.userInfo}
                alignItems="center"
              >
                <Grid item>
                  <AccountCircleIcon classes={{ root: classes.userIcon }} />
                </Grid>
                <Grid item>
                  <Typography
                    variant="body2"
                    align="center"
                    className={classes.username}
                  >
                    {userName}
                  </Typography>
                </Grid>
              </Grid>
              <Grid item>
                <IconButton
                  className={classes.userIcon}
                  onClick={() => {
                    leaveChat();
                    logOut();
                  }}
                >
                  <ExitToAppIcon />
                </IconButton>
              </Grid>
            </>
          )}
          {!loggedIn && (
            <Grid item>
              <Button
                onClick={() => setOpenDialog(!openDialog)}
                className={classes.chooseButton}
              >
                Choose username
              </Button>
            </Grid>
          )}
        </Grid>
        {users.length > 0 && (
          <Grid item>
            <Typography variant="h6" align="center">
              There {helper(users.length) ? 'are' : 'is'} {users.length} user
              {helper(users.length) ? 's' : ''} in chat
            </Typography>
          </Grid>
        )}

        <Grid
          item
          container
          direction="column"
          wrap="nowrap"
          justify={messages.length === 0 ? 'center' : 'flex-start'}
          className={classes.messages}
        >
          {messages.length > 0 &&
            messages.map((message, index) => (
              <Grid item key={index}>
                <Message
                  message={message}
                  self={message?.body?.username === userName}
                />
              </Grid>
            ))}
          {messages.length === 0 && (
            <Grid item>
              <Typography variant="h5" align="center">
                No messages availiable
              </Typography>
            </Grid>
          )}
        </Grid>

        {loggedIn && (
          <Grid
            item
            container
            justify="space-between"
            alignItems="center"
            className={classes.sendMessageWrapper}
          >
            <Grid item>
              <Input
                id="messagefield"
                type="text"
                disableUnderline
                value={messageValue}
                placeholder="Type your message..."
                onChange={(e) => {
                  e.target.value.length < 30 && setMessageValue(e.target.value);
                }}
              />
            </Grid>
            <Grid item className={classes.sendWrapper}>
              <IconButton
                disabled={messageValue === ' ' || !messageValue}
                onClick={() => {
                  sendMessage(messageValue);
                  setMessageValue('');
                }}
              >
                <SendIcon classes={{ root: classes.sendMessage }} />
              </IconButton>
            </Grid>
          </Grid>
        )}
      </Grid>
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        classes={{ root: classes.dialog }}
      >
        <DialogTitle align="center">Choose your username</DialogTitle>
        <DialogContent>
          <Grid
            item
            container
            direction="row"
            justify="space-between"
            align="center"
          >
            <Grid item className={classes.usernameInputWrapper}>
              <TextField
                value={textFieldValue}
                placeholder="Type your username..."
                onChange={(e) => {
                  if (e.target.value.length < 10) {
                    setTextFieldValue(e.target.value);
                  }
                }}
              >
                Choose username
              </TextField>
            </Grid>
            <Grid item>
              <IconButton
                onClick={handleUserNameChange}
                disabled={!textFieldValue || textFieldValue.includes(' ')}
              >
                <SendIcon />
              </IconButton>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </>
  );
}
