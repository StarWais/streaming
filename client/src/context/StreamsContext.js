import { createContext, useState } from 'react';

export const StreamsContext = createContext();

export default function StreamsProvider({ children }) {
  const [streams, setStreams] = useState([]);
  return (
    <StreamsContext.Provider value={{ streams, setStreams }}>
      {children}
    </StreamsContext.Provider>
  );
}
