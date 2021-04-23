import { makeStyles } from '@material-ui/core';

const styles = makeStyles({
  subwrapperNormal: {
    flexWrap: 'nowrap',
    width: '2.4rem',
    marginLeft: 'auto',
  },
  subwrapperAbsolute: {
    flexWrap: 'nowrap',
    width: '2.1rem',
    position: 'absolute',
    bottom: '2rem',
    right: '1rem',
  },
  viewersText: (props) => ({
    fontSize: props.toCard ? '0.8rem' : '1.1rem',
    fontWeight: 'bold',
    color: props.toCard ? 'white' : 'black',
  }),
  icon: (props) => ({
    display: 'block',
    color: props.toCard ? 'white' : 'black',
    height: props.toCard ? '0.9rem' : '1.5rem',
    width: props.toCard ? '0.9rem' : '1.5rem',
  }),
});

export default styles;
