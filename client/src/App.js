import MainLayout from './components/Layouts/MainLayout';
import theme from './context/theme';
import StreamsProvider from './context/StreamsContext';
import UserProvider from './context/UserContext';
import { ThemeProvider } from '@material-ui/core';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import StreamLayout from './components/Layouts/StreamLayout';
function App() {
  return (
    <Router>
      <Switch>
        <ThemeProvider theme={theme}>
          <UserProvider>
            <StreamsProvider>
              <Route path="/" exact>
                <MainLayout />
              </Route>
              <Route path="/streams/:id">
                <StreamLayout />
              </Route>
            </StreamsProvider>
          </UserProvider>
        </ThemeProvider>
      </Switch>
    </Router>
  );
}

export default App;
