import '../index';
import Main from './Main';
import React from 'react'
import ImagePopup from './ImagePopup';
import api from '../utils/Api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import {  Routes, Route, useNavigate } from "react-router-dom";
import Login from './Login';
import Register from './Register';
import ProtectedRouteElement from "./ProtectedRoute";
import * as auth from '../utils/Auth'


function App() {
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isNotificationPopupOpen, setNotificationPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({name: '', link: ''});
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [userEmail, setUserEmail] = React.useState('');

  const navigate = useNavigate()

  React.useEffect(() => {
    handleTokenCheck();
  }, [])

  React.useEffect(() => {
    if (loggedIn) {
      api.getUserInfo()
      .then((result) => {
        setCurrentUser(result)
        api.getInitialCards()
              .then((result) => {
                  const cardsArr = result.map((item) => {
                      return {
                          name: item["name"],
                          link: item["link"],
                          likes: item["likes"],
                          ownerId: item["owner"]._id,
                          _id: item["_id"]
                      }
                  });
                  setCards(cardsArr);
          })
          .catch((error) => {
              console.error(error); 
          })
      })
    }
  }, [loggedIn])




  function signOut(){
    localStorage.removeItem('jwt');
    navigate("/sign-in", {replace: true});
  }
  
  const handleLogin = (email) => {
    setLoggedIn(true);
    setUserEmail(email)
  }

  function authNotify() {
    setNotificationPopupOpen(true);
  }

  function handleCardClick (card) {
    setSelectedCard(card);
  };

  function handleEditAvatarClick () {
    setEditAvatarPopupOpen(true);
  };

  function handleEditProfileClick () {
    setEditProfilePopupOpen(true);
  };

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  };

  function closeAllPopups() {
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setNotificationPopupOpen(false);
    setSelectedCard({name: '', link: ''});
  };

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.togglelike(card._id, !isLiked)
    .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    })
    .catch((error) => {
      console.error(error); 
  });
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
    .then(() => {
      setCards(cards.filter(item => item._id !== card._id));
    })
    .catch((error) => {
      console.error(error); 
    })
  }

  function handleUpdateUser(inputValues) {
    api.editProfile({
      name: inputValues.name,
      about: inputValues.about
    })
    .then((res) =>{
      setCurrentUser(res);
      closeAllPopups();
    })
    .catch((error) => {
      console.error(error); 
  });
  }

  function handleUpdateAvatar(newAvatar) {
    api.updateAvatar(newAvatar)
    .then((res) =>{
      setCurrentUser(res);
      closeAllPopups();
    })
    .catch((error) => {
      console.error(error); 
  });
  }

  function handleAddPlaceSubmit(newCard) {
    api.addCard(newCard)
    .then((res) =>{
      setCards([{
        name: res["name"],
        link: res["link"],
        likes: res["likes"],
        ownerId: res["owner"]._id,
        _id: res["_id"]
    }, ...cards]);
    closeAllPopups();
    })
    .catch((error) => {
      console.error(error); 
  });
  }

  const handleTokenCheck = () => {
    if (localStorage.getItem('jwt')){
      const jwt = localStorage.getItem('jwt');
      auth.checkToken(jwt).then((res) => {
        if (res){
          setUserEmail(res.data.email)
          setLoggedIn(true);
          navigate("/", {replace: true});
        }
      });
    };
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Routes>
        <Route path="/" element={<ProtectedRouteElement element={Main}
            onEditProfile = {handleEditProfileClick}
            onAddPlace = {handleAddPlaceClick}
            onEditAvatar = {handleEditAvatarClick}
            onCardClick = {handleCardClick}
            onCardLike = {handleCardLike}
            onCardDelete = {handleCardDelete}
            userEmail = {userEmail}
            cards={cards}
            loggedIn={loggedIn}
            onLogout={signOut} />}  />
        
        <Route path="/sign-up" element={
          <Register
            isPopupOpen={isNotificationPopupOpen}
            onClose = {closeAllPopups}
            onNotify = {authNotify}
          />
        } />
        <Route path="/sign-in" element={
          <Login
            isPopupOpen={isNotificationPopupOpen}
            onClose = {closeAllPopups}
            onNotify = {authNotify}
            onLogin={handleLogin}
          />
        } />
      </Routes>
      <EditProfilePopup  
        isOpen={isEditProfilePopupOpen}
        onClose = {closeAllPopups} 
        onUpdateUser = {handleUpdateUser}
      />
      <AddPlacePopup onAddPlace={handleAddPlaceSubmit} isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} />
      <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
      <ImagePopup 
        name="zoom-image"
        onClose = {closeAllPopups}
        card = {selectedCard}
      />
    </CurrentUserContext.Provider>
  );
}

export default App;
