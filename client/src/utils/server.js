export const httpServer = `${
  process.env.REACT_APP_SERVER || 'http://localhost'
}:${process.env.REACT_APP_SERVER_PORT || '5000'}`;
export const mediaServer = `${
  process.env.REACT_APP_SERVER || 'http://localhost'
}:${process.env.REACT_APP_MEDIA_PORT || '8000'}`;
