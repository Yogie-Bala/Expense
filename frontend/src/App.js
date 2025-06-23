import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import ThemeRoutes from './routes';
import ToastComponent from './utilis/toast-Components';

const App = () => {
  return (
    <BrowserRouter>
      <ThemeRoutes />
       <ToastComponent />
    </BrowserRouter>
  );
}

export default App;
