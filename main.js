(()=>{"use strict";var e={d:(t,n)=>{for(var r in n)e.o(n,r)&&!e.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:n[r]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t)};e.d({},{Z:()=>M});var t=document.querySelector(".profile__edit-button"),n=document.querySelector(".popup__input_value_name"),r=document.querySelector(".popup__input_value_job"),o=document.querySelector(".profile__add-button"),i=document.querySelector(".profile__image"),a={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__btn",inactiveButtonClass:"popup__btn_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"};function c(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var u=function(){function e(t,n,r,o,i,a,c,u){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._name=t,this._link=n,this._templateSelector=r,this._cardSelector=o,this._cardId=i,this._userId=a,this._handleCardClick=c,this._deleteCardClick=u}var t,n;return t=e,(n=[{key:"_toggleLike",value:function(e){e.target.classList.contains("card__like_active")?M.toggleLikeCard(this._cardId,"DELETE").then((function(t){e.target.classList.remove("card__like_active"),e.target.nextElementSibling.textContent=t.likes.length,console.log(t)})):M.toggleLikeCard(this._cardId,"PUT").then((function(t){e.target.classList.add("card__like_active"),e.target.nextElementSibling.textContent=t.likes.length,console.log(t)}))}},{key:"_deleteCard",value:function(e){e.target.closest(".card").remove(),M.deleteCard(this._cardId).then((function(e){return console.log(e)}))}},{key:"_openPopupConfirmDeleteCard",value:function(e){var t=this,n=this._deleteCardClick();document.querySelector(".popup__btn_type_confirm-delete-card").addEventListener("click",(function(){t._deleteCard(e),n.close()}))}},{key:"_openPopupPicture",value:function(){this._handleCardClick()}},{key:"_setEventListeners",value:function(){var e=this;this._element.querySelector(".card__like").addEventListener("click",(function(t){return e._toggleLike(t)})),this._element.querySelector(".card__trash").addEventListener("click",(function(t){return e._openPopupConfirmDeleteCard(t)})),this._elementImage.addEventListener("click",(function(){return e._openPopupPicture()}))}},{key:"_getTemplate",value:function(){return document.querySelector(this._templateSelector).content.querySelector(this._cardSelector).cloneNode(!0)}},{key:"generateCard",value:function(){return this._element=this._getTemplate(),this._elementImage=this._element.querySelector(".card__image"),this._setEventListeners(),this._elementImage.src=this._link,this._elementImage.alt=this._name,this._element.querySelector(".card__heading").textContent=this._name,this._element}}])&&c(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function s(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function l(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var p=function(){function e(t,n){var r=this;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),l(this,"_showInputError",(function(e,t){r._inputError=r._formElement.querySelector(".".concat(e.id,"-error")),e.classList.add(r._inputErrorClass),r._inputError.classList.add(r._errorClass),r._inputError.textContent=t})),l(this,"_hideInputError",(function(e){r._inputError=r._formElement.querySelector(".".concat(e.id,"-error")),e.classList.remove(r._inputErrorClass),r._inputError.classList.remove(r._errorClass),r._inputError.textContent=""})),l(this,"_checkInputValid",(function(e){e.validity.valid?r._hideInputError(e):r._showInputError(e,e.validationMessage)})),l(this,"_isValid",(function(){return r._inputsList.some((function(e){return!e.validity.valid}))})),l(this,"_liveSwitchStateButton",(function(){r._isValid()?(r._buttonElement.classList.add(r._inactiveButtonClass),r._buttonElement.setAttribute("disabled","disabled")):(r._buttonElement.classList.remove(r._inactiveButtonClass),r._buttonElement.removeAttribute("disabled"))})),l(this,"resetInputsErrors",(function(){r._inputsList.forEach((function(e){r._hideInputError(e),r._liveSwitchStateButton()}))})),this._formElement=n,this._formSelector=t.formSelector,this._inputSelector=t.inputSelector,this._submitButtonSelector=t.submitButtonSelector,this._inactiveButtonClass=t.inactiveButtonClass,this._inputErrorClass=t.inputErrorClass,this._errorClass=t.errorClass}var t,n;return t=e,(n=[{key:"_setEventListeners",value:function(){var e=this;this._inputsList=Array.from(this._formElement.querySelectorAll(this._inputSelector)),this._buttonElement=this._formElement.querySelector(this._submitButtonSelector),this._inputsList.forEach((function(t){t.addEventListener("input",(function(){e._checkInputValid(t),e._liveSwitchStateButton()}))}))}},{key:"enableValidation",value:function(){this._formElement.addEventListener("submit",(function(e){e.preventDefault()})),this._setEventListeners()}}])&&s(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function f(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function _(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var h=function(){function e(t){var n=this;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),_(this,"close",(function(){n._popupSelector.classList.remove("popup_active"),n._popupSelector.removeEventListener("click",n._pushOverlayClose),document.removeEventListener("keydown",n._handleEscClose)})),_(this,"_pushOverlayClose",(function(e){e.target.classList.contains("popup_active")&&n.close()})),_(this,"_handleEscClose",(function(e){"Escape"===e.key&&n.close()})),this._popupSelector=document.querySelector(t)}var t,n;return t=e,(n=[{key:"open",value:function(){this._popupSelector.classList.add("popup_active"),this._popupSelector.addEventListener("click",this._pushOverlayClose),document.addEventListener("keydown",this._handleEscClose)}},{key:"setEventListeners",value:function(){this._popupSelector.querySelector(".popup__close").addEventListener("click",this.close)}}])&&f(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function d(e){return d="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},d(e)}function y(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function v(){return v="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(e,t,n){var r=b(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(arguments.length<3?e:n):o.value}},v.apply(this,arguments)}function b(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=g(e)););return e}function m(e,t){return m=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e},m(e,t)}function S(e,t){if(t&&("object"===d(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}function g(e){return g=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},g(e)}var E=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");Object.defineProperty(e,"prototype",{value:Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),writable:!1}),t&&m(e,t)}(a,e);var t,n,r,o,i=(r=a,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=g(r);if(o){var n=g(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return S(this,e)});function a(e){var t;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,a),(t=i.call(this,e))._popupImage=t._popupSelector.querySelector(".popup__image"),t._popupPictureDescription=t._popupSelector.querySelector(".popup__image-description"),t}return t=a,(n=[{key:"open",value:function(e,t){this._popupImage.src=t,this._popupPictureDescription.alt=e,this._popupPictureDescription.textContent=e,v(g(a.prototype),"open",this).call(this)}}])&&y(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),a}(h);function k(e){return k="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},k(e)}function w(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function C(){return C="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(e,t,n){var r=j(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(arguments.length<3?e:n):o.value}},C.apply(this,arguments)}function j(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=q(e)););return e}function O(e,t){return O=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e},O(e,t)}function L(e,t){if(t&&("object"===k(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return P(e)}function P(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function q(e){return q=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},q(e)}var I=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");Object.defineProperty(e,"prototype",{value:Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),writable:!1}),t&&O(e,t)}(a,e);var t,n,r,o,i=(r=a,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=q(r);if(o){var n=q(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return L(this,e)});function a(e,t){var n,r,o,c;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,a),c=function(e){n._submitForm(n._getInputValues(),e)},(o="_formSubmission")in(r=P(n=i.call(this,e)))?Object.defineProperty(r,o,{value:c,enumerable:!0,configurable:!0,writable:!0}):r[o]=c,n._submitForm=t,n._btnSubmit=n._popupSelector.querySelector(".popup__btn"),n}return t=a,(n=[{key:"_getInputValues",value:function(){var e=this;return this._inputsList=this._popupSelector.querySelectorAll(".popup__input"),this._formValues={},this._inputsList.forEach((function(t){e._formValues[t.name]=t.value})),this._formValues}},{key:"loadingStart",value:function(){this._initialName=this._btnSubmit.textContent,this._btnSubmit.setAttribute("disabled","disabled"),this._btnSubmit.textContent="Сохранение..."}},{key:"loadingEnd",value:function(){this._btnSubmit.textContent=this._initialName,console.log(this._initialName)}},{key:"setEventListeners",value:function(){C(q(a.prototype),"setEventListeners",this).call(this),this._popupSelector.querySelector(".popup__form").addEventListener("submit",this._formSubmission)}},{key:"close",value:function(){C(q(a.prototype),"close",this).call(this),this._popupSelector.classList.contains("popup_type_profile")||this._popupSelector.querySelector(".popup__form").reset()}}])&&w(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),a}(h);function U(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var x=function(){function e(t){var n=t.nameSelector,r=t.jobSelector,o=t.avatarSelector;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._nameSelector=document.querySelector(n),this._jobSelector=document.querySelector(r),this._avatarSelector=document.querySelector(o)}var t,n;return t=e,(n=[{key:"getUserInfo",value:function(){return this._userName=this._nameSelector.textContent,this._userJob=this._jobSelector.textContent,{name:this._userName,job:this._userJob}}},{key:"setUserInfo",value:function(e,t){this._nameSelector.textContent=e,this._jobSelector.textContent=t}},{key:"setUserAvatar",value:function(e){this._avatarSelector.src=e}}])&&U(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function T(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var D=new(function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._baseUrl=t.baseUrl,this._headers=t.headers}var t,n;return t=e,(n=[{key:"getUserName",value:function(){return fetch("".concat(this._baseUrl,"/users/me"),{headers:this._headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))}},{key:"setUserData",value:function(e,t){return fetch("".concat(this._baseUrl,"/users/me").concat(t||""),{method:"PATCH",headers:this._headers,body:JSON.stringify(e)}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))}},{key:"addNewCard",value:function(e,t){return fetch("".concat(this._baseUrl,"/cards"),{method:"POST",headers:this._headers,body:JSON.stringify({name:e,link:t})}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))}},{key:"deleteCard",value:function(e){return fetch("".concat(this._baseUrl,"/cards/").concat(e),{method:"DELETE",headers:this._headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))}},{key:"getCards",value:function(){return fetch("".concat(this._baseUrl,"/cards"),{headers:this._headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))}},{key:"toggleLikeCard",value:function(e,t){return fetch("".concat(this._baseUrl,"/cards/").concat(e,"/likes"),{method:t,headers:this._headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))}}])&&T(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}())({baseUrl:"https://mesto.nomoreparties.co/v1/cohort-35",headers:{authorization:"ba215110-62f5-4bce-89bc-aab13847df95","Content-Type":"application/json"}}),R=new x({nameSelector:".profile__name",jobSelector:".profile__job",avatarSelector:".profile__avatar"});D.getUserName().then((function(e){var t=e.name,n=e.about,r=e.avatar;R.setUserInfo(t,n),R.setUserAvatar(r)})).catch((function(e){return console.log(e)}));var B=function(e,t,n,r,o){var i=function(e,t,n,r){var o=new u(e,t,"#card",".card",n,r,(function(){!function(e,t){var n=new E(".popup_type_picture");n.open(e,t),n.setEventListeners()}(e,t)}),(function(){return(e=new h(".popup_type_confirm-delete-card")).open(),e.setEventListeners(),e;var e}));return o.generateCard()}(e,t,r,n),a=i.querySelector(".card__trash"),c=i.querySelector(".card__number-likes"),s=i.querySelector(".card__like");o.forEach((function(e){"58b594a40c7b10a97241123a"===e._id&&s.classList.add("card__like_active")})),c.textContent=o.length,"58b594a40c7b10a97241123a"!==n&&a.remove(),document.querySelector(".cards__list").prepend(i)};D.getCards().then((function(e){var t=e.reverse();console.log(t),t.forEach((function(e){B(e.name,e.link,e.owner._id,e._id,e.likes)}))}));var N=new I(".popup_type_profile",(function(e,t){t.preventDefault(),N.loadingStart();var n=e.name,r=e.job;D.setUserData({name:n,about:r}).then((function(e){R.setUserInfo(e.name,e.about),N.close(),N.loadingEnd()})).catch((function(e){return console.log(e)}))})),V=new I(".popup_type_place",(function(e,t){t.preventDefault(),V.loadingStart();var n=e.place,r=e.link;D.addNewCard(n,r).then((function(e){B(n,r,e.owner._id,e._id,e.likes),V.close(),V.loadingEnd()})).catch((function(e){return console.log(e)}))})),A=new I(".popup_type_update-avatar",(function(e,t){t.preventDefault(),A.loadingStart();var n=e.avatar;D.setUserData({avatar:n},"/avatar").then((function(e){R.setUserAvatar(e.avatar),A.close(),A.loadingEnd()})).catch((function(e){return console.log(e)}))})),J=function(e){var t=e.querySelector("".concat(a.formSelector)),n=new p(a,t);return n.enableValidation(),n},F=J(document.querySelector(".popup_type_profile")),z=J(document.querySelector(".popup_type_place")),H=J(document.querySelector(".popup_type_update-avatar"));t.addEventListener("click",(function(){var e=R.getUserInfo(),t=e.name,o=e.job;n.value=t,r.value=o,F.resetInputsErrors(),N.open(),N.setEventListeners()})),o.addEventListener("click",(function(){z.resetInputsErrors(),V.open(),V.setEventListeners()})),i.addEventListener("click",(function(){H.resetInputsErrors(),A.open(),A.setEventListeners()}));const M=D})();