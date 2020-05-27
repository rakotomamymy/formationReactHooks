import React, { useEffect } from 'react';
import Cars from '../Cars/Cars';

export default function Home(props) {

    useEffect(() => {
        
    }, []);

    return (
        <div>
            <h3>
                Home page
            </h3>            
            <Cars/> 
        </div>       
    );
};