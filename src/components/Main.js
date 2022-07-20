import React from "react";
import edit from "../images/edit.svg";
import add from "../images/add.svg";
import Card from "../components/Card.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);
  console.log('props main', props);
  return (
    <main className="page__content">
      <div className="profile">
        <img className="profile__image" src={currentUser.avatar} alt="Аватар" />
        <div className="profile__image-edit" onClick={props.onEditAvatar}></div>
        <div className="profile__info">
          <h1 className="profile__title">{currentUser.name}</h1>
          <button
            className="profile__edit-button"
            type="button"
            onClick={props.onEditProfile}
          >
            <img src={edit} alt="Кнопка - редактирование" />
          </button>
          <p className="profile__subtitle">{currentUser.about}</p>
        </div>
        <button
          className="profile__add-button"
          type="button"
          onClick={props.onAddPlace}
        >
          <img src={add} alt="Кнопка - добавить" />
        </button>
      </div>
      <section className="elements">
        {props.cards.map((card) => (
          <Card
            key={card.id}
            {...card}
            onCardClick={props.onCardClick}
            onCardLike={props.handleCardLike}
            onCardDelete={props.handleCardDelete}
          />
        ))}
      </section>
    </main>
  );
}
export default Main;
