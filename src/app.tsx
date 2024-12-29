import React from 'react';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Base from './base';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/doomsday-calendar-quiz/*' element={<Base />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
