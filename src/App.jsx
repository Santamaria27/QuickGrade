import React from 'react'
import Navbar from './components/Navbar/Navbar'
import Hero from './components/Hero/Hero'
import Aboutus from './components/Aboutus/Aboutus'
import Contact from './components/Contact/Contact'
import Footer from './components/Footer/Footer'
import LoginForm from './components/LoginForm/LoginForm'

const App = () => {
  return (
    <div>
    <Navbar/>
    <Hero/>
    <Aboutus/>
    <Contact/>
    <Footer/>
    <LoginForm/>
    </div>
  )
}

export default App