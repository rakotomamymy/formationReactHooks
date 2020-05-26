import React, {useState, useEffect} from 'react';
import './App.css';
import Login from './Login/Login';
import Home from './Home/Home';
import { BrowserRouter as Router, Route } from 'react-router-dom';

function App() {
  
  const [login, setLogin] = useState('Anonymous');

  useEffect(() => {
    if (localStorage.getItem('isAuthenticated') === 'true') {
      setLogin(localStorage.getItem('login'));
    }
  }, []);

  const userLogged = (e) => {
    setLogin(e);
  };

  return (
    <div className="container">
      <Router>
      <span className="mb-3">Connected user : {login}</span>
        <Route exact path="/">
          <Login onLogginSuccess={userLogged}/>
        </Route>
        <Route exact path="/Home/">
          <Home/>
        </Route>
      </Router>
    </div>    
  );
}

export default App;
