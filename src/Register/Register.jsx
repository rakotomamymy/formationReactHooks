import React, {useState} from 'react';
import { useHistory } from 'react-router-dom';

export default function Register(props) {

    const history = useHistory();

    const defaultValue = {
        name: '',
        firstname : '',
        sex : '',
        dateOfBirth : '',
        email: '',
        password: ''
    }
    const [value, setValue] = useState(defaultValue);

    const defaultError = {
        name: [],
        firstname : [],
        sex : [],
        dateOfBirth :[],
        email: [],
        password: []
    }
    const [error, setError] = useState(defaultError);

    const onInputChanged = (e) => {
        const inputValue = e.target.value;
        const inputName = e.target.name;
        setValue({...value, [inputName]: inputValue})

        const validators = validation[inputName];
        handleValidation(inputName, inputValue, validators);
    }

    const handleValidation = (name, value, validators) => {
        let isValid = false;
        validators.forEach(validator => {
            const result = validator(value, name);
            const errorList = error[name];
            if (!result.isValid) {                
                if (!errorList.includes(result.errorMessage))
                    setError(prevState => ({...prevState, [name]: [...errorList, result.errorMessage]}))
                isValid = false;
            } else {                
                if (errorList.includes(result.errorMessage))
                    setError(prevState => ({...error, [name]: errorList.filter(e => e !== result.errorMessage)}))
                isValid = true;
            }
        });
        return isValid;
    };

    const validateAllInput = () => {
        let isFormValid = true;
        Object.keys(value).forEach(key => {
            if (!handleValidation(key, value[key], validation[key]))
                isFormValid = false;            
        });
        return isFormValid;
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

    const isAged13 = (value, name) => {
        const dateOfBirth = +new Date(value);
        const age = ((Date.now() - dateOfBirth) / (31557600000));
        return {
            isValid: age >= 13,
            errorMessage: `You are under 13`
        }
    };

    const isStrongPassword = (value, name) => {
        return {
            isValid : value.length >= 8,
            errorMessage : 'use at least 8 characters'
        };
    };

    const defaultValidation = {
        name: [isRequired],
        firstname : [isRequired],
        sex : [isRequired],
        dateOfBirth :[isAged13, isRequired],
        email: [isEmail, isRequired],
        password: [isStrongPassword, isRequired]
    };
    const [validation, setValidation] = useState(defaultValidation);

    const submitForm = (e) => {
        e.preventDefault();

        if (validateAllInput()) {
            //Call callback function of App.js
            props.onUserRegistering(value.email);

            //Add localStorage
            localStorage.setItem('isAuthenticated', true);
            localStorage.setItem('login', value.email);

            //Add redirection
            history.push('/');
        }
    };

    return(
        <div>
            <h3>Register a new user</h3>
            <div className="m-2">
                <div>Summary of your info :</div>
                <div>Name : {value.name}</div>
                <div>Firstname : {value.firstname}</div>
                <div>Email : {value.email}</div>
                <div>Sex : {value.sex}</div>
                <div>DateOfBirth : {value.dateOfBirth}</div>
                <div>Password : {value.password}</div>
            </div>

            <form onSubmit={submitForm}>
                <div className="m-2">
                    <div>
                        <input type="text" placeholder="Enter your name" name="name" onChange={onInputChanged}/>
                        <span>{error.name !== '' && error.name}</span>
                    </div>
                    
                    <div>
                        <input type="text" placeholder="Enter your firstname" name="firstname" onChange={onInputChanged}/>
                        <span>{error.firstname !== '' && error.firstname}</span>
                    </div>
                    
                    <div>
                        <input type="text" placeholder="Enter your email" name="email" onChange={onInputChanged}/>
                        <span>{error.email.length > 0 && error.email[error.email.length - 1] !== '' && error.email[error.email.length - 1]}</span>
                    </div>                    
                    
                    <div>
                        <select name="sex" onChange={e => onInputChanged(e, [isRequired])}>
                            <option value=""></option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                        <span>{error.sex !== '' && error.sex}</span>
                    </div>
                    
                    <div>
                        <input type="date" placeholder="Enter your date of birth" name="dateOfBirth" onChange={onInputChanged}/>
                        <span>{error.dateOfBirth.length > 0 && error.dateOfBirth[error.dateOfBirth.length - 1] !== '' && error.dateOfBirth[error.dateOfBirth.length - 1]}</span>
                    </div>
                    
                    <div>
                        <input type="password" placeholder="Enter your password" name="password" onChange={onInputChanged}/>
                        <span>{error.password.length > 0 && error.password[error.password.length - 1] !== '' && error.password[error.password.length - 1]}</span>
                    </div>
                        
                    <div className="m-2">
                        <input className="btn btn-default" type="submit" value="submit"/>
                    </div>
                </div>
            </form>
        </div>
    );
}