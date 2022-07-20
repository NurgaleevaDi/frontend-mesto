import React from "react";
import { useEffect, useState } from "react";
import "../index.css";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import Login from "./Login";
import Register from "./Register";
import Api from "../utils/api.js";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import { Route, Redirect, Switch, useHistory } from "react-router-dom";
import * as auth from "../utils/auth.js";
import ProtectedRoute from "./ProtectedRoute";
import InfoTooltip from "./InfoTooltip";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});

  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  const [statusMessage, setStatusMessage] = useState(
    "Что-то пошло не так! Попробуйте еще раз."
  );
  const [statusOpenPopup, setStatusOpenPopup] = useState(false);
  const [statusImg, setStatusImg] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const history = useHistory();

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  }
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  }
  function handleCardClick(name, link) {
    setSelectedCard({ name, link });
  }
  function handleUpdateUser(currentUser) {
    const token = localStorage.getItem('jwt');
    Api.profileEdit(currentUser, token)
      .then((data) => {
        setCurrentUser(data.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(closeAllPopups());
  }

  function handleUpdateAvatar(currentUser) {
    const token = localStorage.getItem('jwt');
    Api.editUserAvatar(currentUser.avatar, token)
      .then((data) => {
        setCurrentUser(data.data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({});
    setStatusOpenPopup(false);
  }


  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i === currentUser._id);
    const token = localStorage.getItem('jwt');
    Api.changeLikeCardStatus((card.id || card._id), !isLiked, token)
      .then((newCard) => {
        setCards((state) => 
          state.map((c) => (c.id === card.id ? newCard.data : c))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardDelete(card) {
    const token = localStorage.getItem('jwt');
    Api.deleteCard((card.id || card._id), token)
      .then((newCard) => {
        setCards((state) => 
          state.filter((c) => (c.id === card.id ? newCard.card.card : c))
        )
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleAddPlaceSubmit(c) {
    const token = localStorage.getItem('jwt');
    Api.addCard(c.name, c.link, token)
      .then((newCard) => {
        setCards([newCard.data, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleRegister(email, password) {
    setStatusOpenPopup(true);

    return auth
      .register(email, password)
      .then(() => {
        setStatusMessage("Вы успешно зарегистрировались!");
        setStatusImg(true);
        history.push("/sign-in");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleLogin(email, password) {
    return auth
      .authorize(email, password)
      .then((data) => {
        if (data.token) {
          localStorage.setItem("jwt", data.token);
          tokenCheck();
          getData();
        }
      })
      .catch((err) => {
        setStatusOpenPopup(true);
        setStatusMessage("Что-то пошло не так! Попробуйте еще раз.");
        console.log(err);
      });
  }

  function tokenCheck() {
    if (localStorage.getItem("jwt")) {
      let jwt = localStorage.getItem("jwt");
      auth
        .getContent(jwt)
        .then((res) => {
          if (res) {
            setUserEmail(res.email);
            setLoggedIn(true);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  function handleSignOut() {
    localStorage.removeItem("jwt");
    setLoggedIn(false);
    history.push("/sign-in");
  }

  const getData = () =>{
    const token = localStorage.getItem('jwt');
    Promise.all([Api.getUserData(token), Api.getCards(token)])
      .then(([userData, cards]) => {
        setCurrentUser(userData);
        setCards(cards.data.map((card) => ({
          src: card.link,
          name: card.name,
          alt: card.name,
          id: card._id,
          owner: card.owner,
          likes: card.likes,
        })));
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    console.log('useEffect data ', loggedIn);
    tokenCheck();
    if (loggedIn) {
      getData();
    }
  }, [loggedIn]);

  // useEffect(() => {
  //   console.log('useEffect tockenCheck ', loggedIn);
  //   tokenCheck();
  // }, []);

  useEffect(() => {
    console.log('useEffect history ', loggedIn);
    if (loggedIn) {
      history.push("/");
    }
  }, [loggedIn]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <body className="page">
        <div className="page__container">
          <Switch>
            <ProtectedRoute exact path="/" loggedIn={loggedIn}>
              <Header
                name="Выйти"
                link="/sign-in"
                email={userEmail}
                handleSignOut={handleSignOut}
              />
              <Main
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onCardClick={handleCardClick}
                cards={cards}
                handleCardLike={handleCardLike}
                handleCardDelete={handleCardDelete}
              />
              <Footer />
            </ProtectedRoute>
            <Route path="/sign-up">
              <Register handleRegister={handleRegister} link={"/sign-in"} />
            </Route>
            <Route path="/sign-in" exact>
              <Login handleLogin={handleLogin} />
            </Route>
            <Route>
              {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
            </Route>
          </Switch>

          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
          />
          <PopupWithForm name="confirm-popup" title="Вы уверены?" button="Да" />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />

          <ImagePopup card={selectedCard} onClose={closeAllPopups} />

          <InfoTooltip
            statusOpenPopup={statusOpenPopup}
            statusMessage={statusMessage}
            statusImg={statusImg}
            onClose={closeAllPopups}
          />
        </div>
      </body>
    </CurrentUserContext.Provider>
  );
}
export default App;
