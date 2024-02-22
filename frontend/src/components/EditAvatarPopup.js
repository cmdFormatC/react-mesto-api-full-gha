import React from 'react'
import PopupWithForm from './PopupWithForm'

export default function EditAvatarPopup(props) {
    const inputRef = React.useRef();
    function handleSubmit(e) {
        e.preventDefault();
      
        props.onUpdateAvatar({
          avatar: inputRef.current.value,
        });
      } 
    return (
        <PopupWithForm
            name="update-avatar" 
            isOpen={props.isOpen}
            onClose = {props.onClose}
            onSubmit = {handleSubmit}
            submitButtonText = "Cохранить">
              <h2 className="popup__title">Обновить аватар</h2>
                <input ref={inputRef} id="input-avatar-url" name="link" type="url" placeholder="Ссылка на аватар" className="popup__input popup__input_card_url" required />
                <span className="input-avatar-url-error popup__error" />
        </PopupWithForm>
    )
}
