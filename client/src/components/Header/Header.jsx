import { useRef } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
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
        </div>{/* end .s-header */}

        <nav className='header__nav-wrapper' ref={ navRef }>
          <h2 className='header__nav-heading'>Navigate to</h2>
          <ul className='header__nav'>
            <li className='active'><a href='/home'>Home</a></li>
            <li><a href='/categories'>Categories</a></li>
            <li><a href='/blog'>Blog</a></li>
            <li><a href='/styles'>Styles</a></li>
            <li><a href='/about'>About</a></li>
            <li><a href='/contact'>Contact</a></li>
          </ul>{/* end .header__nav */}
          <button className='nav-btn header__nav-close'  onClick={ showNavbar }>
            <FaTimes />
          </button>          
        </nav>{/* end .header__nav-wrapper */}
        <button className='nav-btn' onClick={ showNavbar }>
          <FaBars />
        </button>

        <a className='btn-primary' href='/login'>Login</a>
      </header>
    </>
  );
}
