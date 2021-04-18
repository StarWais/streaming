import { makeStyles } from '@material-ui/core';

const styles = makeStyles({
  chatWrapper: {
    height: '100%',
  },
  chooseButton: {},
  header: {
    height: '3rem',
    background: '#F9F9F9',
    padding: '0.5rem',
  },
  messages: {
    height: '30rem',
    padding: '1rem',
    overflow: 'scroll',
  },
  usernameInputWrapper: {
    width: '80%',
  },
  sendMessageWrapper: {
    marginTop: 'auto',
    paddingLeft: '0.6rem',
    background: '#F9F9F9',
  },
  sendWrapper: {
    background: '#3172A8',
  },
  sendMessage: {
    color: 'white',
  },
  userInfo: {
    width: '85%',
  },
  userIcon: {
    height: '2rem',
    width: '2rem',
  },
  username: {
    fontSize: '1.1rem',
    marginLeft: '0.4rem',
  },
});

export default styles;
