import React, {useState, useEffect} from 'react';
import './App.css';
import Login from './Login/Login';
import Home from './Home/Home';
import { BrowserRouter as Router, Route , useHistory} from 'react-router-dom';

function App() {
  
  const [login, setLogin] = useState('Anonymous');
  const history = useHistory();

  useEffect(() => {
    if (localStorage.getItem('isAuthenticated') === 'true') {
      setLogin(localStorage.getItem('login'));
    }
  }, []);

  const userLogged = e => {
    setLogin(e);
  };

  const logingOut = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('login');
    setLogin('Anonymous');
    return history.push('/');
  };

  return (
    <div className="container">
      <div>
        <span className="m-3">Connected user : {login}</span>
        <button className="btn btn-default" onClick={logingOut}>Log out</button>
      </div>
      <Router>
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
