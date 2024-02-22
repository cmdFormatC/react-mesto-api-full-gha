import React from 'react'

export default function ImagePopup(props) {
  return (
    <div className={`popup popup_${props.name} ${props.card.link ? 'popup_opened' : ''}`}>
        <figure className="popup__image-container">
          <button onClick={props.onClose} type="button" className="popup__close-button" />
          <img className="popup__image" alt={props.card.name} src={props.card.link ? props.card.link : null} />
          <figcaption className="popup__caption">{props.card.name}</figcaption>
        </figure>
    </div>
  )
}
