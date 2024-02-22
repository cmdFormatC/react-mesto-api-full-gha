import React from 'react'
import Header from './Header'
import AuthenticationForm from './AuthenticationForm'
import InfoTooltip from './InfoTooltip'
import * as auth from '../utils/Auth'
import {useNavigate} from 'react-router-dom';

export default function Login(props) {
    const [formValue, setFormValue] = React.useState({
        email: '',
        password: ''
    })
    const navigate = useNavigate();
    const handleChange = (e) => {
        const {name, value} = e.target;

        setFormValue({
            ...formValue,
            [name]: value
        });
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formValue.email || !formValue.password){
        return;
        }
        auth.authorize(formValue.password, formValue.email)
        .then((data) => {
        if (data.token){
            props.onLogin(formValue.email);
            setFormValue({email: '', password: ''});
            navigate('/', {replace: true});
        }
        })
        .catch((err) => {
            console.log(err)
            props.onNotify(true)
        });
    }
    
    return (
    <div className='identification'>
        <Header 
            link='/sign-up'
            linkText='Регистрация'
        />
        <AuthenticationForm onSubmit={handleSubmit} onChange={handleChange} title='Вход' buttonText='Войти' />
        <InfoTooltip isOpen={props.isPopupOpen} onClose={props.onClose} success={false} />
    </div>
    )
}
