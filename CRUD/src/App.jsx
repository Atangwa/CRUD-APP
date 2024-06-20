// App.js
import { Routes, Route } from 'react-router-dom';
import Home from './components/home/Home';
import Signup from './components/auth/Signup';
import Login from './components/auth/Login';
import { createContext, useEffect, useState } from 'react';
import { auth } from './firebase/firebase-config';
import Post from './components/postform/Post';
import Update from './components/postform/Update';
import WeatherApp from './components/home/weatherApp';

export const stateContext = createContext();

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userE, setUserE] = useState('');

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsLoggedIn(!!user);
      setUserE(user ? user.email : '');
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <stateContext.Provider value={{ isLoggedIn, setIsLoggedIn, userE }}>
      <Routes>
        <Route path='/' element={<Signup />} />
        <Route path='/weatherapp' element={<WeatherApp />} />
        <Route path='/login' element={<Login />} />
        <Route path='/home' element={isLoggedIn ? <Home /> : <Login />} />
        <Route path='/postform' element={<Post />} />
        <Route path='/post/update/:id' element={<Update />} />
      </Routes>
    </stateContext.Provider>
  );
};

export default App;
