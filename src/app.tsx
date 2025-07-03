import { BrowserRouter } from 'react-router-dom';

import AppContextProvider from './app.context';
import Base from './base';

function App() {
  return (
    <AppContextProvider>
      <BrowserRouter>
        <Base />
      </BrowserRouter>
    </AppContextProvider>
  );
}

export default App;
