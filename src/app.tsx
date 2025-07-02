import { BrowserRouter, Route, Routes } from 'react-router-dom';

import AppContextProvider from './app.context';
import Base from './base';

function App() {
  return (
    <AppContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path={`${import.meta.env.BASE_URL}/*`} element={<Base />} />
        </Routes>
      </BrowserRouter>
    </AppContextProvider>
  );
}

export default App;
