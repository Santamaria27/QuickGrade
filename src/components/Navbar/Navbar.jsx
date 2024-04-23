import React, { useState, useEffect } from 'react'
import'./Navbar.css'
import logo from '../../assets/Asset 3.png'
import { Link, animateScroll as scroll } from 'react-scroll'; 

const Navbar = ({ onLoginClick }) => {

  const[sticky, setSticky]= useState(false);

  useEffect(()=>{
    window.addEventListener('scroll',()=>{
      window.scrollY > 200 ? setSticky(true) : setSticky(false);
    })
  },[]);

  return (
    <nav className={`container ${sticky? 'dark-nav' : '' } `}>
        <img src= {logo} alt="" className='logo' />
        <ul>
        <li>
          <Link
            activeClass="active"
            to="hero"
            spy={true}
            smooth={true}
            offset={-70}
            duration={500}
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            activeClass="active"
            to="about"
            spy={true}
            smooth={true}
            offset={-260}
            duration={500}
          >
            About us
          </Link>
        </li>
        <li>
          <Link
            activeClass="active"
            to="contact"
            spy={true}
            smooth={true}
            offset={-260}
            duration={500}
          >
            Contact
          </Link>
        </li>
            <li><button className='btn' onClick={onLoginClick}>Login</button></li>
        </ul>
    </nav>
  )
}

export default Navbar
