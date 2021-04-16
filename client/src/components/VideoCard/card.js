import React from 'react';
import styles from './styles';
import { Paper, Grid, Typography } from '@material-ui/core';
import { ReactFlvPlayer } from 'react-flv-player';
import Moment from 'react-moment';

export default function Card({ stream }) {
  const classes = styles();
  const { publisher } = stream;
  const { video } = publisher;
  return (
    <Paper className={classes.paper}>
      <Grid container direction="column">
        {!publisher && (
          <Grid item>
            <Typography align="center">This stream probably ended</Typography>
          </Grid>
        )}
        {publisher && (
          <>
            <Grid item>
              <ReactFlvPlayer
                url={`${process.env.REACT_APP_SERVER || 'http://localhost'}:${
                  process.env.REACT_APP_MEDIA_PORT || '8000'
                }/live/${publisher.stream}.flv`}
                height="100%"
                width="100%"
                isMuted={true}
              />
            </Grid>
            <Grid item>
              <Typography variant="body1" align="center">
                Stream started{' '}
                <Moment fromNow>{publisher.connectCreated}</Moment>
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="body1" align="center">
                Stream resulution is {video.width}x{video.height}
              </Typography>
            </Grid>
          </>
        )}
      </Grid>
    </Paper>
  );
}
