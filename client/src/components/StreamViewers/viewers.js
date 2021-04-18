import { useEffect, useState } from 'react';
import axios from 'axios';
import { httpServer } from '../../utils/server';
import styles from './styles';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { Grid, Typography } from '@material-ui/core';

export default function Viewers({ id, color, toCard = false }) {
  const classes = styles({ toCard });
  const [viewers, setViewers] = useState(0);
  useEffect(() => {
    const updateViewers = setInterval(() => {
      axios
        .get(`${httpServer}/streams/getViewers?id=${id}`)
        .then((res) => setViewers(res.data.count))
        .catch((err) => {
          console.log(err.message);
          setViewers(0);
        });
    }, 3000);
    return () => clearTimeout(updateViewers);
  }, [id]);
  return (
    <Grid
      item
      container
      direction="row"
      alignItems="center"
      justify="space-between"
      className={
        !toCard ? classes.subwrapperNormal : classes.subwrapperAbsolute
      }
    >
      <Grid item container justify="center" alignItems="center">
        <VisibilityIcon className={classes.icon} />
      </Grid>
      <Grid item>
        <Typography variant="body2" className={classes.viewersText}>
          {viewers}
        </Typography>
      </Grid>
    </Grid>
  );
}
