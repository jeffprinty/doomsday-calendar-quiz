import React from 'react';

import { BrowserRouter } from 'react-router-dom';

import DoomsdayQuiz from './components/doomsday-quiz';

function App() {
  return (
    <BrowserRouter>
      <main className='flex h-screen flex-col items-center justify-center bg-primary text-color'>
        <DoomsdayQuiz />
      </main>
    </BrowserRouter>
  );
}

export default App;
