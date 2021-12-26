const cardsContainerSelector = '.cards__list',
      buttonEditProfile = document.querySelector('.profile__edit-button'),
      inputName = document.querySelector('.popup__input_value_name'),
      inputJob = document.querySelector('.popup__input_value_job'),
      buttonAddCard = document.querySelector('.profile__add-button'),
      popupPicture = document.querySelector('.popup_type_picture'),
      popupImage = popupPicture.querySelector('.popup__image'),
      popupPictureDescription = popupPicture.querySelector('.popup__image-description');

export {buttonEditProfile, inputName, inputJob, buttonAddCard, popupPicture, popupImage, popupPictureDescription, cardsContainerSelector};