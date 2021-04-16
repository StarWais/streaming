import React from 'react';
import styles from './styles';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
export default function Header({ count }) {
  const classes = styles();
  const helper = () => +count.toString().slice(-1) !== 1;

  return (
    <AppBar position="static" className={classes.appbar}>
      <Toolbar className={classes.toolbar}>
        <Typography variant="h4">
          There {helper() ? 'are' : 'is'} {count}{' '}
          {helper() ? 'streams' : 'stream'} availiable
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
