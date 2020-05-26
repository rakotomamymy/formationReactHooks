import React, {useState} from 'react';

export default function Register() {

    const defaultValue = {
        name: '',
        firstname : '',
        email: '',
        password: ''
    }
    const [value, setValue] = useState(defaultValue);

    const defaultError = {
        name: [],
        firstname : [],
        email: [],
        password: []
    }
    const [error, setError] = useState(defaultError);

    const onInputChanged = (e, validators) => {
        const inputValue = e.target.value;
        const inputName = e.target.name;
        setValue({...value, [inputName]: inputValue})

        handleValidation(e.target, validators)
    }

    const handleValidation = (target, validators) => {
        validators.forEach(validator => {
            const result = validator(target.value, target.name);
            const errorList = error[target.name];
            if (!result.isValid) {                
                if (!errorList.includes(result.errorMessage))
                    setError({...error, [target.name]: [...errorList, result.errorMessage]})
            } else {                
                if (errorList.includes(result.errorMessage))
                    setError({...error, [target.name]: errorList.filter(e => e !== result.errorMessage)})
            }
        });
    };

    const isRequired = (value, name) => {
        return {
            isValid: value !== '',
            errorMessage: `${name} is empty`
        };
    };

    const isEmail = (value, name) => {
        return {
            isValid: value === '' || /\S+@\S+\.\S+/.test(value),
            errorMessage: `invalid ${name}`
        }
    };

    const submitForm = (e) => {
        e.preventDefault();

        //Call callback function of App.js
        //Add localStorage
        //Add redirection
    };

    return(
        <div>
            <h3>Register a new user</h3>
            <div className="m-2">
                <div>Name : {value.name}</div>
                <div>Firstname : {value.firstname}</div>
                <div>Email : {value.email}</div>
                <div>Password : {value.password}</div>
            </div>

            <form onSubmit={submitForm}>
                <div className="m-2">
                    <div>
                        <input type="text" placeholder="Enter your name" name="name" onChange={(e) => onInputChanged(e, [isRequired])}/>
                        <span>{error.name !== '' && error.name}</span>
                    </div>
                    
                    <div>
                        <input type="text" placeholder="Enter your firstname" name="firstname" onChange={(e) => onInputChanged(e, [isRequired])}/>
                        <span>{error.firstname !== '' && error.firstname}</span>
                    </div>
                    
                    <div>
                        <input type="text" placeholder="Enter your email" name="email" onChange={(e) => onInputChanged(e, [isEmail, isRequired])}/>
                        <span>{error.email.length > 0 && error.email[error.email.length - 1] !== '' && error.email[error.email.length - 1]}</span>
                    </div>
                    
                    <div>
                        <input type="text" placeholder="Enter your password" name="password" onChange={(e) => onInputChanged(e, [isRequired])}/>
                        <span>{error.password !== '' && error.password}</span>
                    </div>
                        
                    <div className="m-2">
                        <input className="btn btn-default" type="submit" value="submit"/>                
                    </div>
                </div>
            </form>
        </div>
    );
}