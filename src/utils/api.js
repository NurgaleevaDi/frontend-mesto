// class Api{
//     constructor({address, headers}){
//         this._address = address;
//         this._headers = headers;
//     }
    
//     _handleResponse = (res) => {
//         if (res.ok) {
//             return res.json()
//         }
//         return Promise.reject(`Ошибка ${res.status}`)
//     }

//     getUserData() {
//         return fetch(`${this._address}/users/me`,{
//             // headers: this._headers
//             headers: {
//                 authorization: this._headers.authorization
//             }
//         }).then(this._handleResponse)
//     }

//     getCards() {
//         return fetch(`${this._address}/cards`, {
//             headers: this._headers
//             // headers: {
//             //     authorization: this._headers.authorization
//             // }
//         }).then(this._handleResponse)
//     }

//     profileEdit(name, about){
//         return fetch(`${this._address}/users/me`, {
//             method:'PATCH',
//             headers: {
//                 authorization: this._headers.authorization,
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({
//                 name: name,
//                 about: about
//             })
//         }).then(this._handleResponse)
//     }

//     addCard(name, link){
//         return fetch(`${this._address}/cards`,{
//             method:'POST',
//             headers: {
//                 authorization: this._headers.authorization,
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({
//                 name: name,
//                 link: link
//             })
//         }).then(this._handleResponse)
//     }

//     deleteCard(cardId) {
//         return fetch (`${this._address}/cards/${cardId}`,{
//             method:'DELETE',
//             headers: {
//                 authorization: this._headers.authorization,
//                 'Content-Type': 'application/json'
//             }
//         }).then(this._handleResponse)
    
//     }

//     changeLikeCardStatus(cardId, isLiked) {
//         return fetch (`${this._address}/cards/${cardId}/likes`,{
//             method: isLiked ? 'PUT' : 'DELETE',
//             headers: {
//                 authorization: this._headers.authorization,
//                 'Content-Type': 'application/json'
//             }
//         }).then(this._handleResponse)   
//     }



//     editUserAvatar(url){
//         return fetch(`${this._address}/users/me/avatar`,{
//             method:'PATCH',
//             headers: {
//                 authorization: this._headers.authorization,
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({
//                 avatar: url
//             })
//         }).then(this._handleResponse)
//     }

// }
// const api = new Api({
//     address: 'http://api.backend.students.nomoredomains.xyz',
//     headers: {'Content-Type': 'application/json'}
//   }); 

// export default api;

// class Api{
//     constructor({address, token}){
//         this._address = address;
//         this._token = token;
//     }
    
//     _handleResponse = (res) => {
//         if (res.ok) {
//             return res.json()
//         }
//         return Promise.reject(`Ошибка ${res.status}`)
//     }

//     getUserData() {
//         return fetch(`${this._address}/users/me`,{
//             headers: {
//                 authorization: this._token
//             }
//         }).then(this._handleResponse)
//     }

//     getCards() {
//         return fetch(`${this._address}/cards`, {
//             headers: {
//                 authorization: this._token
//             }
//         }).then(this._handleResponse)
//     }

//     profileEdit(name, about){
//         return fetch(`${this._address}/users/me`, {
//             method:'PATCH',
//             headers: {
//                 authorization: this._token,
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({
//                 name: name,
//                 about: about
//             })
//         }).then(this._handleResponse)
//     }

//     addCard(name, link){
//         return fetch(`${this._address}/cards`,{
//             method:'POST',
//             headers: {
//                 authorization: this._token,
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({
//                 name: name,
//                 link: link
//             })
//         }).then(this._handleResponse)
//     }

//     deleteCard(cardId) {
//         return fetch (`${this._address}/cards/${cardId}`,{
//             method:'DELETE',
//             headers: {
//                 authorization: this._token,
//                 'Content-Type': 'application/json'
//             }
//         }).then(this._handleResponse)
    
//     }

//     changeLikeCardStatus(cardId, isLiked) {
//         return fetch (`${this._address}/cards/${cardId}/likes`,{
//             method: isLiked ? 'PUT' : 'DELETE',
//             headers: {
//                 authorization: this._token,
//                 'Content-Type': 'application/json'
//             }
//         }).then(this._handleResponse)   
//     }



//     editUserAvatar(url){
//         return fetch(`${this._address}/users/me/avatar`,{
//             method:'PATCH',
//             headers: {
//                 authorization: this._token,
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({
//                 avatar: url
//             })
//         }).then(this._handleResponse)
//     }

// }
// const api = new Api({
//     address: 'https://mesto.nomoreparties.co/v1/cohort-35',
//     token: '7b2f9279-45b3-4b51-8e23-d855b4f2907e'
//   }); 

// export default api;
class Api{
    constructor({address, headers}){
        this._address = address;
        this._headers = headers;
    }
    
    _handleResponse = (res) => {
        if (res.ok) {
            return res.json()
        }
        return Promise.reject(`Ошибка ${res.status} ${res.statusText}`)
    }

    getUserData(token) {
        return fetch(`${this._address}/users/me`,{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        }).then(this._handleResponse)
    }

    getCards(token) {
        return fetch(`${this._address}/cards`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        }).then(this._handleResponse)
    }

    // profileEdit(name, about){
    //     return fetch(`${this._address}/users/me`, {
    //         method:'PATCH',
    //         headers: this._headers,
    //         body: JSON.stringify({
    //             name: name,
    //             about: about
    //         })
    //     }).then(this._handleResponse)
    // }

     profileEdit(user, token){
        return fetch(`${this._address}/users/me`, {
            method:'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                name: user.name,
                about: user.about
            })
        }).then(this._handleResponse)
    }

    addCard(name, link, token){
        return fetch(`${this._address}/cards`,{
            method:'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                name: name,
                link: link
            })
        }).then(this._handleResponse)
    }

    deleteCard(cardId, token) {
        return fetch (`${this._address}/cards/${cardId}`,{
            method:'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }).then(this._handleResponse)
    
    }

    changeLikeCardStatus(cardId, isLiked, token) {
        return fetch (`${this._address}/cards/${cardId}/likes`,{
            method: isLiked ? 'PUT' : 'DELETE',
            headers:  {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        }).then(this._handleResponse)   
    }



    editUserAvatar(url, token){
        return fetch(`${this._address}/users/me/avatar`,{
            method:'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                avatar: url
            })
        }).then(this._handleResponse)
    }

}

const api = new Api({
    address: 'https://api.backend.students.nomoredomains.xyz',
    headers: {
        'Content-Type': 'application/json',
        // 'Authorization': `Bearer ${localStorage.getItem('jwt')}`
    },
  }); 

export default api;