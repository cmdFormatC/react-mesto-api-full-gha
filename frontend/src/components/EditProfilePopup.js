import React from 'react'
import PopupWithForm from './PopupWithForm'
import { CurrentUserContext } from '../contexts/CurrentUserContext';


export default function EditProfilePopup(props) {
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');
    const currentUser = React.useContext(CurrentUserContext);
    React.useEffect(() => {
        if (currentUser) {
          setName(currentUser.name || '');
          setDescription(currentUser.about || '');
        }
    }, [currentUser, props.isOpen]);
    
    function handleChangeName(e) {
        setName(e.target.value);
    }
    function handleChangeDescription(e) {
        setDescription(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateUser({
          name,
          about: description,
        });
      } 
    
    return (
        <PopupWithForm
                name="edit-profile" 
                isOpen={props.isOpen}
                onClose = {props.onClose}
                onSubmit = {handleSubmit}
                submitButtonText = "Cохранить">
                <h2 className="popup__title">Редактировать профиль</h2>
                <input id="input-profile-name" onChange={handleChangeName} value={name} name="profileName" type="text" minLength="2" maxLength="40" placeholder="Имя" className="popup__input popup__input_profile_name" required />
                <span className="input-profile-name-error popup__error" />
                <input id="input-profile-description" onChange={handleChangeDescription} value={description} name="profileDescription" type="text" minLength="2" maxLength="200" placeholder="О себе" className="popup__input popup__input_profile_description" required />
                <span className="input-profile-description-error popup__error" />
        </PopupWithForm>
  )
}
