import { makeStyles } from '@material-ui/core';

const styles = makeStyles({
  paper: {
    maxWidth: '20rem',
    maxHeight: '15rem',
    padding: '1rem',
    cursor: 'pointer',
  },
  thumbnail: {
    display: 'block',
    marginBottom: '1rem',
    borderRadius: '10px',
  },
  wrapper: {
    position: 'relative',
  },
  iconWrapper: {
    position: 'absolute',
    top: '33%',
    left: '40%',
    width: '30px',
    height: '30px',
  },
  icon: {
    color: 'white',
    height: '40px',
    width: '40px',
  },
});

export default styles;
