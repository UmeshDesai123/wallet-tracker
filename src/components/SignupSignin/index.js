import React, { useDebugValue, useState } from 'react';
import './styles.css'
import CustomInput from '../custom-input';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, getRedirectResult } from 'firebase/auth';
import { auth, getDoc, provider } from '../../firebase';
import { doc, setDoc, db } from '../../firebase';
import { useNavigate } from 'react-router-dom';

function SignupSigninComponent() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [loading, setLoading] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const navigate = useNavigate();

  const signUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (name !== '' && email !== '' && password !== '' && confirmPass !== '') {
      if (password !== confirmPass) {
        toast.error('Password not matching');
        setLoading(false);
        return;
      }
    
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        console.log(user);
        toast.success('Sign up successfull');
        await createDoc(user);
        setLoading(false);
        navigate('/dashboard');
      } catch (error) {
        toast.error(error.message);
        setLoading(false);
      }
      finally{
        // setName('');
        // setEmail('');
        // setPassword('');
      } 
      // try {
      //   // console.log('>>', name, email, password, confirmPass);
      //   const userCred = await createUserWithEmailAndPassword(auth, email, password);
      //   const user = userCred.user;
      //   console.log(user);
      //   toast.success('Sign up successfull');
      //   setLoading(false);
      // } catch (error) {
      //   toast.error(error);
      //   setLoading(false);
      // }
    }
    else {
      toast.error('All fields are required', {
        // position: toast.POSITION.TOP_RIGHT
      });
      console.log('ALL');
      setLoading(false);
    }

  }

  const login = async (e) => {
    e.preventDefault();
    setLoading(true);
    if(email !== '' && password !== ""){
      console.log(email, password);
      try {
        const userCred = await signInWithEmailAndPassword(auth, email, password);
        const user = userCred.user;
        console.log('loged', user)
        toast.success('Loged in successfully')
        setLoading(false);
        navigate('/dashboard');
      } catch (error) {
        toast.error(error.message);
        setLoading(false);
      }
    }
    else{
      toast.error('All fields are required');
      setLoading(false);
    }
  }

  const createDoc = async (user) => {
    try {
      if(!user) return;
      const userReff = doc(db, 'users', user.uid);
      const userData = await getDoc(userReff);

      if(userData.exists()){
        await setDoc(doc(db, 'users', user.uid), {
          name: user.displayName ? user.displayName : name,
          email: user.email ? user.email : email,
          photoURL: user.photoURL ? user.photoURL : '',
          createdAt: Date.now()
        });
      }
    } catch (error) {
      // toast.error(error.message);
      console.log(error.message);
    }
    
  }

  const signupGoogle = async () => {
    try {
      setLoading(true);
      const result = await signInWithPopup(auth, provider);
      const creds = GoogleAuthProvider.credentialFromResult(result);
      const user = result.user;
      createDoc(user);
      toast.success('Sign up successfull');
      navigate('/dashboard');
      console.log('>>>', creds, user);
    } catch (error) {
      toast.error(error.message);
      console.log(error.message);
    }
    finally{
      setLoading(false);
    }
  }

  return (
    <>
      {
        showLogin ?
          <div className='signup-wrapper'>
            <h2 className='title'>
              Sign in on <span>Wallet Tracker</span>
            </h2>
            <form>
              <CustomInput
                label={'Email'}
                type={'email'}
                placeholder={'umesh@example.com'}
                value={email}
                setState={setEmail}
              />
              <CustomInput
                label={'Password'}
                type={'password'}
                placeholder={'example123'}
                value={password}
                setState={setPassword}
              />
              <button disabled={loading} onClick={login}>Sign in</button>
            </form>
            <p>or</p>
            <button disabled={loading} onClick={signupGoogle}>Sign in with Google</button>
            <p className='show-login' onClick={() => {setShowLogin(!showLogin)}}>
              Don't have an account, click here to sign Up
            </p>
          </div>
          :
          <div className='signup-wrapper'>
            <h2 className='title'>
              Sign Up on <span>Wallet Tracker</span>
            </h2>
            <form>
              <CustomInput
                label={'Full Name'}
                type={'text'}
                placeholder={'Umesh Desai'}
                value={name}
                setState={setName}
              />
              <CustomInput
                label={'Email'}
                type={'email'}
                placeholder={'umesh@example.com'}
                value={email}
                setState={setEmail}
              />
              <CustomInput
                label={'Password'}
                type={'password'}
                placeholder={'example123'}
                value={password}
                setState={setPassword}
              />
              <CustomInput
                label={'Confirm Password'}
                type={'password'}
                placeholder={'example123'}
                value={confirmPass}
                setState={setConfirmPass}
              />
              <button disabled={loading} onClick={signUp}>Sign Up</button>
            </form>
            <p>or</p>
            <button disabled={loading} onClick={signupGoogle}>Sign Up with Google</button>
            <p className='show-login' onClick={() => {setShowLogin(!showLogin)}}>
              Already have an account, click here to login
            </p>
          </div>
      }
      {/* <ToastContainer></ToastContainer> */}
    </>
  )
}

export default SignupSigninComponent