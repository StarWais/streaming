import { ReactFlvPlayer } from 'react-flv-player';
import { Paper } from '@material-ui/core';
import styles from './styles';

export default function StreamPage({ streamLink }) {
  const classes = styles();

  return (
    <Paper className={classes.videopaper}>
      <ReactFlvPlayer url={streamLink} isMuted={true} />
    </Paper>
  );
}
