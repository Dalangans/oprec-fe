import React, { useState } from 'react';
import Home from './home/Home';
import Leaderboard from './leaderboard/Leaderboard';
import Play from './play/Play';
import LoginForm from './auth/LoginForm';

function App() {
  const [page, setPage] = useState('home');
  const [currentUser, setCurrentUser] = useState(null);

  const handleLogin = (userData) => {
    // Here you would typically make an API call to verify the user
    setCurrentUser(userData);
    setPage('play');
  };

  const renderPage = () => {
    switch(page) {
      case 'play':
        return currentUser 
          ? <Play onNavigate={setPage} user={currentUser} />
          : <LoginForm onSubmit={handleLogin} onBack={() => setPage('home')} />;
      case 'leaderboard':
        return <Leaderboard onNavigate={setPage} />;
      default:
        return <Home onNavigate={setPage} />;
    }
  };

  return (
    <div className="min-h-screen w-full">
      {renderPage()}
    </div>
  );
}

export default App;