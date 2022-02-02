class Api {
   constructor(options) {
      this._baseUrl = options.baseUrl;
      this._headers = options.headers;
   }

   getUserName() {
      return (
         fetch(`${this._baseUrl}/users/me`, {
            headers: this._headers,
         }).then(res => {
   
            if (res.ok) {
               return res.json();
            }
            
            return Promise.reject(`Ошибка: ${res.status}`);
         })
      )
   }

   setUserData(userData, avatarUrl) {
      return (
         fetch(`${this._baseUrl}/users/me${avatarUrl ? avatarUrl : ''}`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify(userData)
         }).then(res => {
   
            if (res.ok) {
               return res.json();
            } else {
               return Promise.reject(`Ошибка: ${res.status}`);
            }
         })
      )
   }

   addNewCard(name, link) {
      return (
         fetch(`${this._baseUrl}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
               name,
               link,
            })
         }).then(res => {
   
            if (res.ok) {
               return res.json();
            } else {
               return Promise.reject(`Ошибка: ${res.status}`);
            }
         })
      )
   }

   deleteCard(cardId) {
      return (
         fetch(`${this._baseUrl}/cards/${cardId}`, {
            method: 'DELETE',
            headers: this._headers,
         }).then(res => {
   
            if (res.ok) {
               return res.json();
            } else {
               return Promise.reject(`Ошибка: ${res.status}`);
            }
         })
      )
   }

   getCards() {
      return (
         fetch(`${this._baseUrl}/cards`, {
            headers: this._headers,
         }).then(res => {
   
            if (res.ok) {
               return res.json();
            } else {
               return Promise.reject(`Ошибка: ${res.status}`);
            }
         })
      )
   }

   toggleLikeCard(cardId, method) {
      return (
         fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
            method,
            headers: this._headers,
         }).then(res => {
   
            if (res.ok) {
               return res.json();
            } else {
               return Promise.reject(`Ошибка: ${res.status}`);
            }
         })
      )
   }
}

export default Api;