import React from 'react';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Base from './base';

function App() {
  return (
    <BrowserRouter>
      <main className='flex h-screen w-screen flex-col items-center justify-start bg-primary text-color'>
        <Routes>
          <Route path='/doomsday-calendar-quiz/*' element={<Base />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
