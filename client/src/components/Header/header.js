import React from 'react';
import styles from './styles';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
export default function Header({ count }) {
  const classes = styles();
  return (
    <AppBar position="static" className={classes.appbar}>
      <Toolbar className={classes.toolbar}>
        <Typography variant="h4">
          There are {count}{' '}
          {+count.toString().slice(-1) !== 1 ? 'streams' : 'stream'} availiable
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
