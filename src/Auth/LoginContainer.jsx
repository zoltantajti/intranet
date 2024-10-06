import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from './LoginForm';
import { validateLoginForm } from '../utils/validate';
import { apiClient } from '../interactions/apiClient';
import MyStorage from '../utils/mystorage';


const LoginContainer = () => {
    const navigate = useNavigate();
    const [state, setState] = useState({
        errors: {},
        user: {
            username: '',
            password: ''
        }
    })   

    const handleChange = (event) => {
        const field = event.target.name;
        let user = state.user;
        let errors = state.errors;
        user[field] = event.target.value;
        errors[field] = "";
        errors['message'] = "";
        setState({ ...state, user });
        setState({ ...state, errors })
    }

    const validateForm = (event) => {
        event.preventDefault();
        var payload = validateLoginForm(state.user);
        if (payload.success) {
            setState({ ...state, errors: {} });
            var user = {
                usr: state.user.username,
                pw: state.user.password
            };
            submitLogin(user);
        } else {
            const errors = payload.errors;
            setState({ ...state, errors });
        }
    }

    
    const loginResponseHandler = (res) => {
        if (res) {
            if(res.status){
                MyStorage.session.put('token', res.token);
                MyStorage.session.put('user', res.user);
                MyStorage.session.put('isLoggedIn', true);
                navigate('/');
            }else{
                const errors = {message: res.msg};
                setState({ ...state, errors });
            };
        }
    }

    const submitLogin = async (user) => {
        let params = { username: user.usr, password: user.pw };
        const client = new apiClient(`http://intranet/_api_provider`);
        client.post('/UserProvider/login', params, loginResponseHandler)
    }

    return (
        <div>
            <LoginForm
                onSubmit={validateForm}
                onChange={handleChange}
                errors={state.errors}
                user={state.user}
            />
        </div>
    );
};

export default LoginContainer;