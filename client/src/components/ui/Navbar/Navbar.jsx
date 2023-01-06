import { useRef } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import logo from '../../../assets/logo.svg';

import './Navbar.css';

export default function Header(props) {
  const navRef = useRef();

  const showNavbar = () => {
    navRef.current.classList.toggle('header__toggle-menu');
  };

  return (
    <>
      <header className='header'>
        <div className='header__logo'>
          <a href='index.html'>
            <img src={logo} alt='Wordsmith Logo' />
          </a>
        </div>{/* end .header__logo */}

        <div className='header__nav-wrapper'>
          <nav className='header__nav-links' ref={navRef}>
            <a className='active' href='/home'>Home</a>
            <a href='/categories'>Categories</a>
            <a href='/about'>About</a>
            <a href='/contact'>Contact</a>
            <a className='auth-link' href='/login'>Login</a>
            <button className='nav-btn header__nav-close' onClick={showNavbar}>
              <FiX />
            </button>
          </nav>{/* end .header__nav-links */}
          <button className='nav-btn' onClick={showNavbar}>
            <FiMenu />
          </button>
        </div>{/* end .header__nav-wrapper */}
      
      </header>{/* end .header */}
    </>
  );
}
