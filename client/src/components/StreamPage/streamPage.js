import { useEffect } from 'react';
import { ReactFlvPlayer } from 'react-flv-player';
import { Paper } from '@material-ui/core';
import styles from './styles';

export default function StreamPage({ streamLink }) {
  const classes = styles();
  return (
    <Paper className={classes.videopaper}>
      <ReactFlvPlayer
        url={streamLink}
        heigh="800px"
        width="800px"
        isMuted={true}
      />
    </Paper>
  );
}
