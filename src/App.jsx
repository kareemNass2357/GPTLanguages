import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Italian from './pages/Italian';
import React from 'react';
import { ItalianProvider } from './context/ItalianContext';

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<MainLayout />}>
        <Route
          index
          element={<Italian />}
        />
      </Route>
    )
  );

  return (
    <ItalianProvider>
      <RouterProvider router={router} />
    </ItalianProvider>
  );
};

export default App;
