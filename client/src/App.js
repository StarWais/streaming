import MainLayout from './components/Layouts/MainLayout';
import StreamsProvider from './context/StreamsContext';
import theme from './context/theme';
import { ThemeProvider } from '@material-ui/core';
function App() {
  return (
    <ThemeProvider theme={theme}>
      <StreamsProvider>
        <MainLayout />
      </StreamsProvider>
    </ThemeProvider>
  );
}

export default App;
