import React from 'react'
import Navbar from './components/Navbar/Navbar'
import Hero from './components/Hero/Hero'
import Aboutus from './components/Aboutus/Aboutus'
import Title from './components/Title/Title'
import Contact from './components/Contact/Contact'
import Footer from './components/Footer/Footer'
const App = () => {
  return (
    <div>
    <Navbar/>
    <Hero/>
    <Title/>
    <Aboutus/>
    <Contact/>
    <Footer/>
    </div>
  )
}

export default App