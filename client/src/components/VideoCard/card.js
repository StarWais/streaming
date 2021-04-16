import React, { useEffect, useState } from 'react';
import styles from './styles';
import { Paper, Grid, Typography, IconButton } from '@material-ui/core';
import { PlayArrow } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';

export default function Card({ stream }) {
  const [ago, setAgo] = useState(null);
  const { id, created, thumbnail } = stream;
  const classes = styles();
  useEffect(() => {
    const timer = setInterval(
      () => setAgo(<Moment fromNow>{created}</Moment>),
      1000
    );
    return () => clearInterval(timer);
  }, [created]);
  return (
    <Paper className={classes.paper}>
      <Grid container direction="column" justify="center" alignItems="center">
        <Grid item className={classes.wrapper}>
          <img
            src={`data:image/jpeg;base64,${thumbnail}`}
            alt="stream_preview"
            className={classes.thumbnail}
          />
          <IconButton
            component={Link}
            to={`/streams/${id}`}
            className={classes.iconWrapper}
          >
            <PlayArrow className={classes.icon} />
          </IconButton>
        </Grid>
        {ago && (
          <Grid item>
            <Typography variant="body1" align="center">
              Stream started {ago}
            </Typography>
          </Grid>
        )}
      </Grid>
    </Paper>
  );
}
