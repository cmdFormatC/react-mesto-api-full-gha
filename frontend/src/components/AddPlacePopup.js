import React from 'react'
import PopupWithForm from './PopupWithForm'


export default function AddPlacePopup(props) {
    const [url, setUrl] = React.useState('');
    const [description, setDescription] = React.useState('');
    React.useEffect(() =>{
        setUrl('');
        setDescription('');
    }, [props.isOpen])
    function handleChangeUrl(e) {
        setUrl(e.target.value);
    }
    function handleChangeDescription(e) {
        setDescription(e.target.value);
    }

    function handleSubmit (e) {
        e.preventDefault();
        props.onAddPlace({
            name: description,
            link: url
        })
    }

    return (
        <PopupWithForm 
            name="add-card" 
            isOpen={props.isOpen}
            onClose = {props.onClose}
            onSubmit = {handleSubmit}
            submitButtonText = "Создать">
            <h2 className="popup__title">Новое место</h2>
            <input onChange={handleChangeDescription} id="input-card-name" value={description} name="name" type="text" minLength="2" maxLength="30" placeholder="Название" className="popup__input popup__input_card_name" required />
            <span className="input-card-name-error popup__error" />
            <input onChange={handleChangeUrl} id="input-card-url" value={url} name="link" type="url" placeholder="Ссылка на картинку" className="popup__input popup__input_card_url" required />
            <span className="input-card-url-error popup__error" />
        </PopupWithForm>
  )
}
