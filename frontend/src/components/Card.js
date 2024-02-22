import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export default function Card(props) {
    const currentUser = React.useContext(CurrentUserContext);
    const isOwn = props.card.ownerId === currentUser._id;
    const isLiked = props.card.likes.some(i => i._id === currentUser._id);
    const cardLikeButtonClassName = ( 
        `element__like-button ${isLiked && 'element__like-button_active'}` 
    );
    function handleClick() {
        props.onCardClick(props.card);
    }
    function handleLikeClick() {
        props.onCardLike(props.card);
    }
    function handleDeleteClick() {
        props.onCardDelete(props.card);
    }
    return (
        <div className="element">
            {isOwn && <button type="button" onClick={handleDeleteClick} className="element__delete-button" />} 
            <div className="element__image" onClick={handleClick} style={{ backgroundImage: `url(${props.card.link})` }} />
            <div className="element__description">
                <h3 className="element__title">{props.card.name}</h3>
                <div className="element__like">
                    <button onClick={handleLikeClick} type="button" className={cardLikeButtonClassName}></button>
                    <span className="element__like-counter">{props.card.likes.length}</span>
                </div>
            </div>
        </div>
    )
}
