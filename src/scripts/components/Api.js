class Api {
   constructor(options) {
      this._baseUrl = options.baseUrl;
      this._headers = options.headers;
   }

   _checkResponse(res) {
      if (res.ok) {
         return res.json();
      }

      return Promise.reject(`Ошибка: ${res.status}`);
   }

   getUserName() {
      return (
         fetch(`${this._baseUrl}/users/me`, {
            headers: this._headers,
         }).then(this._checkResponse)
      )
   }

   setUserData(userData, avatarUrl) {
      return (
         fetch(`${this._baseUrl}/users/me${avatarUrl ? avatarUrl : ''}`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify(userData)
         }).then(this._checkResponse)
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
         }).then(this._checkResponse)
      )
   }

   deleteCard(cardId) {
      return (
         fetch(`${this._baseUrl}/cards/${cardId}`, {
            method: 'DELETE',
            headers: this._headers,
         }).then(this._checkResponse)
      )
   }

   getCards() {
      return (
         fetch(`${this._baseUrl}/cards`, {
            headers: this._headers,
         }).then(this._checkResponse)
      )
   }

   toggleLikeCard(cardId, method) {
      return (
         fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
            method,
            headers: this._headers,
         }).then(this._checkResponse)
      )
   }
}

export default Api;