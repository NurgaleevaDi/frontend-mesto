import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
  const urlRef = React.useRef("");

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar({
      avatar: urlRef.current.value,
    });
  }
  React.useEffect(() => {
    urlRef.current.value = "";
  }, [props.isOpen]);

  return (
    <PopupWithForm
      name="avatar-popup"
      title="Обновить аватар"
      // button="Сохранить"
      button={props.isLoading ? 'Сохранение...' : 'Сохранить'}
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      
    >
      <input
        type="url"
        ref={urlRef}
        className="popup__input-text popup__input-text_type_image popup__input-text_type_avatarUrl"
        id="popup-avatar"
        name="name"
        placeholder="Ссылка на аватар"
        required
        minLength="2"
        maxLength="300"
      />
      <span id="popup-avatar-error" className="error"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
