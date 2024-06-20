// 


import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, db, googleProvider } from '../../firebase/firebase-config';
import { addDoc, collection } from 'firebase/firestore';
import { stateContext } from '../../App';
import './Signup.css'; // Import new CSS file for styling

function Signup() {
  const [email, setEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [pending, setPending] = useState(false);
  const usersCollectionRef = collection(db, 'users');
  const { setIsLoggedIn, isLoggedIn, setE } = useContext(stateContext);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setPending(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      await signInWithEmailAndPassword(auth, email, password);
      await addDoc(usersCollectionRef, {
        email,
        name: userName,
        thumbnail: '',
      });
      setPending(false);
      navigate('/home');
    } catch (err) {
      setPending(false);
      console.error('Signup error:', err);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <h2 className="signup-title">Signup</h2>
        <form className="signup-form" onSubmit={handleSignup}>
          <input
            className="input-field"
            type="text"
            placeholder="Full Name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <input
            className="input-field"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="input-field"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="signup-button">
            {pending ? 'Signing Up...' : 'Sign Up'}
          </button>
        </form>
        
        <p className="already-account">
          Already have an account?{' '}
          <span className="login-link" onClick={() => navigate('/login')}>
            Login
          </span>
        </p>
        
        <h3 className="social-login-title">Login with Social Media</h3>
        <div className="social-login-buttons">
          <img src="git.png" alt="GitHub" className="social-icon" />
          <img src="face.png" alt="Facebook" className="social-icon" />
          <img
            src="google.png"
            alt="Google"
            className="social-icon"
            onClick={async () => {
              try {
                await signInWithPopup(auth, googleProvider);
                navigate('/home');
              } catch (e) {
                console.error('Google Sign-In error:', e);
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default Signup;
