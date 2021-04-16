import { useContext, useEffect } from 'react';
import styles from './styles';
import { Container, Grid, Typography } from '@material-ui/core';
import { StreamsContext } from '../../../context/StreamsContext';
import Card from '../../VideoCard';
import Header from '../../Header';
import axios from 'axios';

export default function Layout() {
  const classes = styles();
  const { streams, setStreams } = useContext(StreamsContext);
  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_SERVER || 'http://localhost'}:${
          process.env.REACT_APP_MEDIA_PORT || '8000'
        }/api/streams`
      )
      .then((res) => {
        if (JSON.stringify(res.data) === '{}') {
          return;
        }
        if (Object.keys(res.data['live']).length > 0) {
          setStreams(Object.values(res.data['live']));
        }
      });
  }, [setStreams]);
  return (
    <Container maxWidth="lg">
      {streams && (
        <>
          <Header count={streams.length} />
          <Grid container direction="column" justify="center">
            {streams.map((stream) => (
              <Grid item key={stream?.publisher?.stream}>
                <Card stream={stream} />
              </Grid>
            ))}
          </Grid>
        </>
      )}
      {!streams && (
        <Typography align="center">No streams availiable right now</Typography>
      )}
    </Container>
  );
}
