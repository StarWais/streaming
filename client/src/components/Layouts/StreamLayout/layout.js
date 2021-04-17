import { useParams } from 'react-router-dom';
import { Grid, Container, Typography } from '@material-ui/core';
import StreamPage from '../../StreamPage';
import styles from './styles';
import Chat from '../../Chat';

export default function Layout() {
  const { id } = useParams();
  const classes = styles();

  return (
    <Container maxWidth="lg">
      <Typography variant="h3" align="center" gutterBottom>
        You are watching stream <span className={classes.id}>#{id}</span>
      </Typography>
      <Grid container justify="space-between" direction="row">
        <Grid item lg={7}>
          <StreamPage
            streamLink={`${
              process.env.REACT_APP_SERVER || 'http://localhost'
            }:${process.env.REACT_APP_MEDIA_PORT || '8000'}/live/${id}.flv`}
          ></StreamPage>
        </Grid>
        <Grid item lg={4}>
          <Chat id={id} />
        </Grid>
      </Grid>
    </Container>
  );
}
