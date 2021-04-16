import React from 'react';
import styles from './styles';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import isOdd from 'is-odd';
export default function Header({ count }) {
  const classes = styles();
  return (
    <AppBar position="static" className={classes.appbar}>
      <Toolbar className={classes.toolbar}>
        <Typography variant="h4">
          There are {count} {!isOdd(count) ? 'streams' : 'stream'} availiable
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
