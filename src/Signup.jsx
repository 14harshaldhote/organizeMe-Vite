import React, { useState, useEffect } from 'react';
import { getAuth, createUserWithEmailAndPassword, fetchSignInMethodsForEmail, GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import logo1 from "./assets/logo1.png";
import google from "./assets/google.png";

const Signup = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dob, setDob] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate('/');
      }
    });

    return () => unsubscribe();
  }, [auth, navigate]);

  const signUpWithEmailPassword = async () => {
    try {
      const methods = await fetchSignInMethodsForEmail(auth, email);

      if (methods && methods.length > 0) {
        console.error('Email is already in use');
   
        return;
      }
      await createUserWithEmailAndPassword(auth, email, password);
      console.log('Email/Password sign-up successful');
      navigate('/');
    } catch (error) {
      console.error('Error signing up with email/password:', error.message);
    }
  };

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      console.log('Google sign-in successful');
      navigate('/');
    } catch (error) {
      console.error('Error signing in with Google:', error);
    }
  };


  return (
    <div className='bg-gray-800'>
      <div className="flex items-center justify-left p-3">
        <img id="logo" src={logo1} alt="Mountain Icon" className="logo h-28" />
      </div>

      <div className="container bg-gray-800">
        <div id="signup-form" className="glass-morphism p-8 rounded-lg absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <h3 className="text-2xl font-semibold text-center">स्वागत ह 🙏🏽</h3>

          <div className="mb-3">
            <label htmlFor="firstName" className="block text-gray-600">
              First Name:
            </label>
            <input
              type="text"
              className="form-input w-full bg-gray-500"
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="lastName" className="block text-gray-600">
              Last Name:
            </label>
            <input
              type="text"
              className="form-input w-full bg-gray-500"
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="dob" className="block text-gray-600">
              Date of Birth:
            </label>
            <input
              type="date"
              className="form-input w-full bg-gray-500"
              id="dob"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="block text-gray-600">
              Email:
            </label>
            <input
              type="email"
              className="form-input w-full bg-gray-500"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="block text-gray-600">
              Password:
            </label>
            <input
              type="password"
              className="form-input w-full bg-gray-500"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className='mb-3 social mt-3 flex justify-around'>
            <button
              className="btn btn-primary mb-2"
              onClick={signUpWithEmailPassword}
            >
              Sign Up
            </button>
            <img
              id="logo"
              onClick={signInWithGoogle}
              src={google}
              alt="google"
              className="cursor-pointer w-6 h-6"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
