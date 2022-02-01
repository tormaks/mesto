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

   setUserName(name, about) {
      return (
         fetch(`${this.baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this.headers,
            body: JSON.stringify({
               name,
               about,
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
}

export default Api;