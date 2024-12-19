import React from 'react';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import DoomsdayQuizContainer from './components/doomsday-quiz-container';

function App() {
  return (
    <BrowserRouter>
      <main className='flex h-screen w-screen flex-col items-center justify-start bg-primary text-color'>
        <Routes>
          <Route path='/doomsday-calendar-quiz/*' element={<DoomsdayQuizContainer />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
