import React, {useState} from 'react'
import Header from './Header'
import AuthenticationForm from './AuthenticationForm'
import InfoTooltip from './InfoTooltip'
import * as auth from '../utils/Auth'

export default function Register(props) {
    const [formValue, setFormValue] = useState({
        email: '',
        password: ''
      })
    const [isSucces, setSucces] = useState(false);
    const handleChange = (e) => {
    const {name, value} = e.target;

    setFormValue({
        ...formValue,
        [name]: value
    });
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        auth.register(formValue.password, formValue.email)
        .then((res) => {
            console.log(res)
            setSucces(true);
            props.onNotify(true);
            setFormValue({
                email: '',
                password: ''
            })
        })
        .catch((err) => {
            props.onNotify(true);
        });
    }
    return (
    <div className='identification'>
        <Header 
            link='/sign-in'
            linkText='Войти'
        />
        <AuthenticationForm onSubmit={handleSubmit} onChange={handleChange} isSingUp={true} title='Регистрация' buttonText='Зарегистрироваться' />
        <InfoTooltip isOpen={props.isPopupOpen} onClose={props.onClose} success={isSucces} />
    </div>
    )
}

