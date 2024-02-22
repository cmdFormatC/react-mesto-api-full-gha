import React from 'react';
import ErrorImage from '../images/error.svg';
import SuccessImage from '../images/success.svg';
import {useNavigate} from 'react-router-dom';

export default function InfoTooltip(props) {
  const navigate = useNavigate();
  function handleClose () {
    props.onClose();
    if (props.success) {
      navigate("/sign-in", {replace: true});
    }
  }
  return (
    <div className={`popup popup_alert ${props.isOpen  ? 'popup_opened' : ''}`}>
        <figure className="popup__alert-container">
          <button onClick={handleClose} type="button" className="popup__close-button" />
          <img className="popup__icon" alt='иконка' src={props.success ? SuccessImage : ErrorImage} />
          <figcaption className="popup__alert">
            {props.success ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}
          </figcaption>
        </figure>
    </div>
  )
}
