import React, { useState, useEffect } from 'react'
import'./Navbar.css'
import logo from '../../assets/Asset 3.png'

const Navbar = () => {

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
            <li>Home</li>
            <li>About us</li>
            <li>Contact</li>
            <li>FAQ</li>
            <li><button className='btn'>Login</button></li>
        </ul>
    </nav>
  )
}

export default Navbar
