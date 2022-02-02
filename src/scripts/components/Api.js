class Api {
   constructor(options) {
      this.baseUrl = options.baseUrl;
      this.headers = options.headers;
   }

   getUserName() {
      return (
         fetch(`${this.baseUrl}/users/me`, {
            headers: this.headers,
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
         fetch(`${this.baseUrl}/users/me${avatarUrl ? avatarUrl : ''}`, {
            method: 'PATCH',
            headers: this.headers,
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

   // setUserAvatar(avatar) {
   //    return (
   //       fetch(`${this.baseUrl}/users/me/avatar`, {
   //          method: 'PATCH',
   //          headers: this.headers,
   //          body: JSON.stringify({
   //             avatar,
   //          })
   //       }).then(res => {
   
   //          if (res.ok) {
   //             return res.json();
   //          } else {
   //             return Promise.reject(`Ошибка: ${res.status}`);
   //          }
   //       })
   //    )
   // }

   addNewCard(name, link) {
      return (
         fetch(`${this.baseUrl}/cards`, {
            method: 'POST',
            headers: this.headers,
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
         fetch(`${this.baseUrl}/cards/${cardId}`, {
            method: 'DELETE',
            headers: this.headers,
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
         fetch(`${this.baseUrl}/cards`, {
            headers: this.headers,
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
         fetch(`${this.baseUrl}/cards/${cardId}/likes`, {
            method,
            headers: this.headers,
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