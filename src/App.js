import React, {useState, useEffect} from 'react';
import './App.css';
import Login from './Login/Login';
import Home from './Home/Home';
import {LogOutWithHistory} from './LogOut/LogOut';
import { BrowserRouter as Router, Route , Switch} from 'react-router-dom';

function App() {
  
  const [login, setLogin] = useState('Anonymous');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('isAuthenticated') === 'true') {
      setIsAuthenticated(true);
      setLogin(localStorage.getItem('login'));
    } else {
      setIsAuthenticated(false);
      setLogin('Anonymous');
    }
  }, []);

  const userLogged = e => {
    setIsAuthenticated(true);
    setLogin(e);
  };

  const userLoggedOut = () => {
    setIsAuthenticated(false);
    setLogin('Anonymous');
  };

  return (
    <div className="container">
      <div>
        <span className="m-3">Connected user : {login}</span>
      </div>
      <Router>
        {isAuthenticated && <LogOutWithHistory logginOut={userLoggedOut}/>}
        <Switch>
          <Route path="/Home/">
            <Home/>
          </Route>
          <Route path="/">
            <Login onLogginSuccess={userLogged}/>
          </Route>
        </Switch>        
      </Router>
    </div>    
  );
}

export default App;
