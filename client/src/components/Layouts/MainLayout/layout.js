import { useContext, useEffect, useState } from 'react';
import styles from './styles';
import { Container, Grid, Typography } from '@material-ui/core';
import { StreamsContext } from '../../../context/StreamsContext';
import Card from '../../VideoCard';
import { httpServer } from '../../../utils/server';
import Header from '../../Header';
import axios from 'axios';

export default function Layout() {
  const classes = styles();
  const { streams, setStreams } = useContext(StreamsContext);
  const [error, setError] = useState('');
  useEffect(() => {
    axios
      .get(`${httpServer}/streams/info`)
      .then((res) => {
        if (res.status === 200) {
          setStreams(res.data.streams);
        }
      })
      .catch((err) => {
        setError(err.response.data.error);
      });
  }, [setStreams]);
  return (
    <>
      {streams.length > 0 && (
        <Container maxWidth="lg">
          <>
            <Header count={streams.length} />
            <Grid container direction="column" justify="center">
              {streams.map((stream) => (
                <Grid item key={stream.id}>
                  <Card stream={stream} />
                </Grid>
              ))}
            </Grid>
          </>
        </Container>
      )}
      {error && (
        <Grid
          container
          justify="center"
          alignItems="center"
          className={classes.nostreams}
        >
          <Grid item>
            <Typography
              align="center"
              variant="h2"
              className={classes.nostreamsText}
            >
              {error}
            </Typography>
          </Grid>
        </Grid>
      )}
    </>
  );
}
