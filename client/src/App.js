import MainLayout from './components/Layouts/MainLayout';
import StreamsProvider from './context/StreamsContext';
import theme from './context/theme';
import { ThemeProvider } from '@material-ui/core';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import StreamLayout from './components/Layouts/StreamLayout';
function App() {
  return (
    <Router>
      <Switch>
        <ThemeProvider theme={theme}>
          <StreamsProvider>
            <Route path="/" exact>
              <MainLayout />
            </Route>
            <Route path="/streams/:id">
              <StreamLayout />
            </Route>
          </StreamsProvider>
        </ThemeProvider>
      </Switch>
    </Router>
  );
}

export default App;
