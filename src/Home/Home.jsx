import React, { useEffect } from 'react';
import Cars from '../Cars/Cars';

export default function Home(props) {

    useEffect(() => {
        
    }, []);

    return (
        <div>
            <h3>
                Hello Azure !!!
            </h3>            
            <Cars/> 
        </div>       
    );
};