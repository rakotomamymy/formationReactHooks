import React from 'react';
import { withRouter } from 'react-router';
import { useHistory } from 'react-router-dom';

export default function LogOut(props) {

    const history = useHistory();

    const loggingOut = () => {
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('login');

        props.logginOut();

        history.push('/Login/');
    };

    return(
        <button className='btn btn-default' onClick={loggingOut}>Log out</button>
    );
}

export const LogOutWithHistory = withRouter(LogOut);