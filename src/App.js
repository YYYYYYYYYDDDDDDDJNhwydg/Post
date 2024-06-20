import React, { useEffect, useState } from 'react';
import './style/App.css';
import { BrowserRouter} from 'react-router-dom';
import Navbar from './components/UI/navbar/Navbar';
import AppRouter from './components/AppRouter';
import { AuthContext } from './context';


function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setLoading] = useState(true)

  useEffect(() =>{
    if(localStorage.getItem('auth')){
      setIsAuth(true)
    } else {
      setIsAuth(false)
    } 
    setLoading(false);
  }, [])

  return (
    <AuthContext.Provider value={{
        isAuth,
        setIsAuth,
        isLoading
    }}>
      <BrowserRouter>
        <Navbar />
        <AppRouter />
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
