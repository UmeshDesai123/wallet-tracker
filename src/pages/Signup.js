import React from 'react'
import Header from '../components/Header';
import SignupSigninComponent from '../components/SignupSignin';
// import './../App.css';

function Signup() {
  return (
    <div>
      <Header></Header>
      <div className='signup-container'>
        <SignupSigninComponent />
      </div>
    </div>
  )
}

export default Signup;