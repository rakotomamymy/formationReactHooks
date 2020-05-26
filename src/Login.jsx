import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

export default function Login(props) {

    const [login, setLogin] = useState('');
    const history = useHistory();

    const onAuthentication = e => {
        //Some authentication logic here
        
        props.onLogginSuccess(login);

        localStorage.setItem('login', login);
        localStorage.setItem('isAuthenticated', 'true');
        
        return history.push('/Home/');
    };

    return (
        <div>
            <h3>Identify yourself</h3>

            <div className="m-2">
                <div>Login : {login}</div>
            </div>

            <div className="m-2">
                <div>
                    <input type="text" placeholder="Enter your login" onChange={(e) => setLogin(e.target.value)}/>
                </div>
                
                <div>
                    <input type="password" placeholder="Enter your password"/>
                </div>
                
                <div className="m-2">
                    <input className="btn btn-default" type="button" value="Login" onClick={onAuthentication}/>
                </div>
            </div>
        </div>
    );
};