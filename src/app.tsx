import React from 'react';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import DoomsdayQuiz from './components/doomsday-quiz';

function App() {
  return (
    <BrowserRouter
      future={{
        v7_relativeSplatPath: true
      }}
    >
      <main className='flex h-screen w-screen flex-col items-center justify-center bg-primary text-color'>
        <Routes>
          <Route path='/doomsday-calendar-quiz' element={<DoomsdayQuiz />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
