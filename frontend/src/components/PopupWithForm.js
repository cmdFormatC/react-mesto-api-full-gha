import React from 'react'

export default function PopupWithForm(props) {
  return (
    <div className={`popup popup_${props.name} ${props.isOpen ? 'popup_opened' : ''}`}>
        <div className="popup__container">
          <button type="button" onClick={props.onClose} className="popup__close-button" />
          <form onSubmit={props.onSubmit} className="popup__form" name={props.name} noValidate>
            {props.children}
            <button className="popup__button">{props.submitButtonText}</button>
          </form>
        </div>
    </div>
  )
}
