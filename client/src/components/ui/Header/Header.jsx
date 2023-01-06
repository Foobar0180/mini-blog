import { useRef } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import logo from '../../../assets/logo.svg';

import './Header.css';

export default function Header(props) {
  const navRef = useRef();

  const showNavbar = () => {
    navRef.current.classList.toggle('header__toggle-menu')
  }

  return (
    <>
      <header className='header'>

        <div className='header__logo'>
          <a href='index.html'>
            <img src={ logo } alt='Site Logo' />
          </a>
        </div>{/* end .header__logo */}

        <div className='header__nav-wrapper'>
          <nav className='header__nav' ref={ navRef }>
            <ul className='header__nav-menu'>
              <li className='active'><a href='/home'>Home</a></li>
              <li><a href='/categories'>Categories</a></li>
              <li><a href='/about'>About</a></li>
              <li><a href='/contact'>Contact</a></li>
              <li><a className='auth-link' href='/login'>Login</a></li>
            </ul>
            <button className='nav-btn header__nav-close' onClick={ showNavbar }>
              <FiX />
            </button>          
          </nav>{/* end .header__nav */}
          <button className='nav-btn' onClick={ showNavbar }>
            <FiMenu />
          </button>
        </div>{/* end .header__nav-wrapper */}

      </header>{/* end .header */}
    </>
  );
}
