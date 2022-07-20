import React from "react";
import trash from "../images/trash.svg";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card(props) {
  // console.log(props);
  const currentUser = React.useContext(CurrentUserContext);
  // console.log('currentUser card ',currentUser);
  const isOwn = (props.owner || props.owner._id) === currentUser._id;
  
  const cardDeleteButtonClassName = `${
    isOwn ? "elements__button-delete" : "elements__button-delete_hidden"
  }`;
  const isLiked = props.likes.some((i) => i === currentUser._id);
  const cardLikeButtonClassName = `elements__button-like ${
    isLiked ? "elements__button-like_active" : ""
  }`;

  function handleClick() {
    props.onCardClick(props.name, props.src);
  }

  function handleLikeClick() {
    props.onCardLike(props);
  }

  function handleDeleteClick() {
    props.onCardDelete(props);
  }

  return (
    <article className="elements__item">
      <button
        className={cardDeleteButtonClassName}
        onClick={handleDeleteClick}
        type="button"
      >
        <img src={trash} alt="Удалить" />
      </button>
      <img
        className="elements__image"
        src={props.src}
        alt={props.alt}
        onClick={handleClick}
      />
      <div className="elements__describe">
        <h3 className="elements__name">{props.name}</h3>
        <div className="elements__like">
          <button
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
            type="button"
          ></button>
          <p className="elements__like-counter">{props.likes.length}</p>
        </div>
      </div>
    </article>
  );
}

export default Card;
