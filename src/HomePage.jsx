import React, { useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import Hero from './components/Hero/Hero'
import Aboutus from './components/Aboutus/Aboutus'
import Contact from './components/Contact/Contact'
import Footer from './components/Footer/Footer'
//import LoginForm from './components/LoginForm/LoginForm'//
import Login from './components/Login/Login'
import SignUp from './components/SignUp/SignUp'
import Modal from './components/Modal/Modal'

const HomePage = () => {

  const [showLogin, setShowLogin] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);

 /*const toggleLoginForm = () => {
    setShowLoginForm(!showLoginForm);
  };*/
 
  const toggleLogin = () => {
    setShowLogin(!showLogin);
  };

  const toggleSignUp = () => {
    setShowSignUp(!showSignUp);
  };


  return (
    <div>
      <Navbar onLoginClick={toggleLogin} onSignUpClick={toggleSignUp}/>
      <Hero onSignUpClick={toggleSignUp}/>
      <Aboutus/>
      <Contact/>
      <Footer/> 
      <Modal show={showLogin} onClose={toggleLogin}>
        <Login />
      </Modal>
      <Modal show={showSignUp} onClose={toggleSignUp}>
        <SignUp />
      </Modal>
    </div>
  )
}

export default HomePage