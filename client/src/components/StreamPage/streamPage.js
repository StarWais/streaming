import { ReactFlvPlayer } from 'react-flv-player';
import { Paper, Grid } from '@material-ui/core';
import styles from './styles';
import StreamViewers from '../StreamViewers';

export default function StreamPage({ streamLink, id }) {
  const classes = styles();

  return (
    <Paper className={classes.videopaper}>
      <Grid container direction="column">
        <Grid item>
          <ReactFlvPlayer url={streamLink} isMuted={true} />
        </Grid>
        <StreamViewers id={id} color="black" />
      </Grid>
    </Paper>
  );
}
