import { useParams } from 'react-router-dom';
import { Grid, Container, Typography } from '@material-ui/core';
import StreamPage from '../../StreamPage';
import styles from './styles';

export default function Layout() {
  const { id } = useParams();
  const classes = styles();
  return (
    <Container maxWidth="lg">
      <Typography variant="h3" align="center" gutterBottom>
        You are watching stream <span className={classes.id}>#{id}</span>
      </Typography>
      <Grid container justify="space-between" align="center">
        <Grid item>
          <StreamPage
            streamLink={`${
              process.env.REACT_APP_SERVER || 'http://localhost'
            }:${process.env.REACT_APP_MEDIA_PORT || '8000'}/live/${id}.flv`}
          ></StreamPage>
        </Grid>
        <Grid item></Grid>
      </Grid>
    </Container>
  );
}
