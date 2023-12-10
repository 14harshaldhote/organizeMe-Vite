import React, { useState, useEffect } from 'react';
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import logo1 from "./assets/logo1.png";
import google from "./assets/google.png";
import loginGif from "./assets/img2.jpg";
import './Login.css'; // Import the CSS file

const Login = () => {
    const auth = getAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                navigate('/main');
            }
        });

        return () => unsubscribe();
    }, [auth, navigate]);

    const signInWithEmailPassword = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            console.log('Email/Password sign-in successful');
            navigate('/main');
        } catch (error) {
            console.error('Error signing in with email/password:', error.message);
            setError('Invalid email or password. Please try again.');
        }
    };

    const signInWithGoogle = async () => {
        const provider = new GoogleAuthProvider();
        try {
            await signInWithPopup(auth, provider);
            console.log('Google sign-in successful');
            navigate('/main');
        } catch (error) {
            console.error('Error signing in with Google:', error);
            setError('Error signing in with Google. Please try again.');
        }
    };

    const navigateToSignup = () => {
        navigate('/signup');
    };

    return (
        <div className='bg-gray-900'>


            <div className="flex flex-col md:flex-row">
                <div className="nav flex items-center justify-start p-3 bg-opacity-50">
                    <img id="logo" src={logo1} alt="Organize Me Logo" className="logo w-auto h-28" />
                    <div>
                        <p className="text-lg text-gray-600">Elevate your productivity and simplify your tasks in style.</p>
                        <p className="text-lg text-gray-600">Organize Me - Where efficiency meets aesthetics for a delightful planning experience.</p>
                    </div>
                </div>
                <div className="text-center my-8">


                </div>


                <div className="md:w-1/2 h-screen bg-cover bg-center relative" style={{ backgroundImage: `url(${loginGif})`, opacity: 0.85 }}>
                    <div className="flex flex-col justify-center items-center h-full bg-gray-900 bg-opacity-50 p-8  shadow-lg" style={{ backdropFilter: 'blur(10px)', backgroundColor: 'rgba(255, 255, 255, 0.1)', border: '1px solid rgba(255, 255, 255, 0.2)' }}>
                        <h2 className="text-2xl font-semibold text-white mb-4">Namaskaram 🙏🏾</h2>
                        {error && <p className="text-danger mb-4">{error}</p>}

                        <label htmlFor="username" className="block mt-3 text-gray-300 text-md font-medium">Username</label>
                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type="text"
                            id="username"
                            className="custom-input mt-2"
                            style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', border: '1px solid rgba(255, 255, 255, 0.2)' }}
                        />

                        <label htmlFor="password" className="block mt-3 text-gray-300 text-md font-medium">Password</label>
                        <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            id="password"
                            className="custom-input mt-2"
                            style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', border: '1px solid rgba(255, 255, 255, 0.2)' }}
                        />

                        <div className="social mt-4 flex justify-around">
                            <button onClick={signInWithEmailPassword} className="btn btn-primary bg-lime-600 px-6 rounded-md">
                                Login
                            </button>
                            <div className='mt-2'>
                                <img onClick={signInWithGoogle} id="logo" src={google} alt="google" style={{ width: '24px', height: '24px' }} />
                            </div>
                        </div>
                        <br />
                        <div className='pt-3'>
                            <a id="atag" onClick={navigateToSignup} href="#create-account" className="text-gray-300 ">
                                Do you have an account?
                            </a>
                        </div>
                    </div>

                </div>




            </div>
        </div>
    );
};

export default Login;
