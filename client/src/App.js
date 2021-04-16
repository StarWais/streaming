import MainLayout from './components/Layouts/MainLayout';
import StreamsProvider from './context/StreamsContext';

function App() {
  return (
    <StreamsProvider>
      <MainLayout />
    </StreamsProvider>
  );
}

export default App;
