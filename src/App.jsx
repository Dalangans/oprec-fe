import React, { useState } from 'react';
import Home from './home/Home';
import Settings from './settings/Settings';
import Play from './play/Play';

function App() {
  const [page, setPage] = useState('home');

  if (page === 'play') return <Play onNavigate={setPage} />;
  if (page === 'settings') return <Settings onNavigate={setPage} />;

  return <Home onNavigate={setPage} />;
}

export default App;