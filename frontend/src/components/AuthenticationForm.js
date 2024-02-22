import React from 'react'
import { Link } from "react-router-dom";

export default function AuthenticationForm(props) {
  return (
    <form onSubmit={props.onSubmit} className='authentication-form'>
      <h1 className='authentication-form__title'>{props.title}</h1>
      <input onChange={props.onChange} name="email" type='email' placeholder='Email' className='authentication-form__input'></input>
      <input onChange={props.onChange} name="password" type='password' placeholder='Пароль' className='authentication-form__input'></input>
      <button type="submit" className='authentication-form__button'>{props.buttonText}</button>
      {props.isSingUp ? <p className='authentication-form__singin-text'>Уже зарегистрированы?<Link className='authentication-form__link' to='/sign-in'> Войти</Link></p> : ''}
    </form>
  )
}
