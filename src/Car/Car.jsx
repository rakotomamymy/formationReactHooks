import React from 'react';

export default function Car(props) {

    const {brand, model} = props;

    return (
        <div>
            <span>{brand}</span>
            <span>{model}</span>
        </div>
    );
}