import { useState } from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';

import Navbar from './components/navbar';
import Home from './components/home';
import Paste from './components/paste';



const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <div>
        <Navbar />
        <Home />
      </div>
    ),
  },
  {
    path: '/paste',
    element: (
      <div>
        <Navbar />
        <Paste />
      </div>
    ),
  }
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
      
    </>
  );
}

export default App;
