import React from 'react';
import Car from '../Car/Car';

export default function Cars() {
    
    const cars = [{id: 1, brand: 'VW', model: 'Caddy'}, {id: 2, brand:'BMW', model:'M3'}];

    return (
        <div>
            <div>List of all my cars :</div>
            <div className="m-2">
            {
                cars.map(car => <Car key={car.id} brand={car.brand} model={car.model}/>)
            }
            </div>                    
        </div>
    );
}