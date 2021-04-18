import React from 'react';
import styles from './styles';
import Moment from 'react-moment';
import { Paper, Grid, Typography } from '@material-ui/core';

export default function Message({ message, self = false }) {
  const classes = styles({ self });
  if (message.type === 'message') {
    return (
      <Paper className={classes.wrapper}>
        <Grid container direction="column" spacing={1}>
          <Grid item>
            <Typography variant="body1" className={classes.message}>
              {message.body.message}
            </Typography>
          </Grid>
          <Grid item container justify={self ? 'flex-end' : 'space-between'}>
            {!self && (
              <Grid item>
                <Typography variant="body2" className={classes.sender}>
                  {message.body.username}
                </Typography>
              </Grid>
            )}
            <Grid item>
              <Typography variant="body2" className={classes.date}>
                <Moment format="hh:mm">{message.body.createdAt}</Moment>
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    );
  } else {
    return (
      <Typography variant="body2" align="center" className={classes.alert}>
        {message.body}
      </Typography>
    );
  }
}
