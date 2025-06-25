import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Base from './base';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={`${import.meta.env.BASE_URL}/*`} element={<Base />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
