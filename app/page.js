'use client';
import Image from 'next/image';
import { auth, provider } from '../firebase';
import { signInWithPopup } from 'firebase/auth';
import { useEffect, useState } from 'react';

function Login() {
  const [value, setValue] = useState('');

  const handleClickWithGoogle = () => {
    signInWithPopup(auth, provider).then((data) => {
      setValue(data.user.email);
      localStorage.setItem('email', data.user.email);
      console.log('Sign-in successful');
      window.location.href = '/Dashboard'; // Use window.location.href for redirection
    });
  }
  
  useEffect(() => {
    setValue(localStorage.getItem('email'));
  }, []);

  return (
    <div className='flex flex-col justify-center items-center mt-[15%] gap-0'>
      <div className='main-logo'>
        <Image src='/locationlogo.png' alt='logo' width={300} height={300}/>
      </div>

      <button type='button' className="google-btn" onClick={handleClickWithGoogle}>
        <div className="google-icon-wrapper">
          <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="Google Logo" />
        </div>
        <p className="btn-text"><b>Sign in with Google</b></p>
      </button>
    </div>
  );
}

export default Login;
