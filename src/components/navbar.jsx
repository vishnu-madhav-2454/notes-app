import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className='bg-purple-700 flex items-center justify-end p-4 gap-5 w-100%'>
      <NavLink to="/" className='bg-purple-950 text-white px-5 py-2 rounded'>
        Home
      </NavLink>
      <NavLink to="/paste" className='bg-purple-950 text-white px-5 py-2 rounded'>
        Pastes
      </NavLink>
    </div>
  );
}

export default Navbar;

