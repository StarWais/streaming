import { makeStyles } from '@material-ui/core';

const styles = makeStyles({
  wrapper: (props) => ({
    maxWidth: '10rem',
    borderRadius: '10px',
    marginLeft: props.self ? 'auto' : '0',
    padding: '0.6rem',

    marginBottom: '0.8rem',

    background: props.self ? '#3172A8' : 'white',
  }),
  message: (props) => ({
    color: props.self ? 'white' : 'black',
    fontSize: '0.85rem',
  }),
  sender: {
    fontSize: '0.65rem',
    color: 'darkgray',
  },
  alert: {
    marginBottom: '1rem',
  },
  date: (props) => ({
    color: props.self ? 'white' : 'darkgray',
    fontSize: '0.65rem',
  }),
});

export default styles;
