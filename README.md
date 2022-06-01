
# Subarashi backend

## Prerequisites

- Have **node@16.*** or plus and **npm@8.*** or plus
- Git

## Start the project
- Clone the project
```bash
git clone https://github.com/antobrines/Subarashii-BackEnd-Audit-v2.git
```
- Install the dependencies with 
```bash
npm i 
```
- Copy paste .env.sample and rename the copy to .env
- Change **DB_URL** in the .env to your url of mongodb atlas or local mongodb database
- Change **TOKEN_SECRET** and **TOKEN_EXPIRE** if needed
- If you have nodemon launch the project with :
```bash
nodemon src
```
- Or else :
```bash
npm run dev
```








## Deployment

The project is deployed to this url :

[https://subarashii-backend.vercel.app](https://duckduckgo.com)

We are using vercel for deploying your backend.

### How to use

- Install the vercel cli
```bash
npm i -g vercel
```
- Create a vercel configuration (.vercel.json)
- Run the command
```bash
vercel
```
And your done ! 

# Routes

All routes are starting by /api/
## **Users :** 
### Register

* **URL**

  /users/register

* **Method:**

  `POST`
  
*  **URL Params**

   None

* **Body Params**

  **Required:**
 
   `username=[string]`

   `password=[string]`

   `confirm_password=[string]`

   `email=[string]`

* **Sample Call:**

  ```javascript
    fetch('https://subarashii-backend.vercel.app/api/users/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: {
            username: 'John',
            password: 'Doe69',
            confirm_password: 'Doe69',
            email: 'john_doe@lyon.fr'
        }
    })
  ```

### Login

* **URL**

  /users/login

* **Method:**

  `POST`
  
*  **URL Params**

   None

* **Body Params**

  **Required:**
 
   `password=[string]`

   `email=[string]`

* **Sample Call:**

  ```javascript
    fetch('https://subarashii-backend.vercel.app/api/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: {
            email: 'john_doe@lyon.fr',
            password: 'Doe69'
        }
    })
  ```

### Ban
  Must be an admin

* **URL**

  /users/ban/:userId

* **Method:**

  `PATCH`
  
*  **URL Params**

   `userId=[string]`

* **Body Params**

  None

* **Sample Call:**

  ```javascript
    fetch('https://subarashii-backend.vercel.app/api/users/ban/1', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer token'
        }
    })
  ```

### Unban
  Must be an admin

* **URL**

  /users/unban/:userId

* **Method:**

  `PATCH`
  
*  **URL Params**

   `userId=[string]`

* **Body Params**

  None

* **Sample Call:**

  ```javascript
    fetch('https://subarashii-backend.vercel.app/api/users/unban/1', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer token'
        }
    })
  ```

### Me
Return information of connected user
* **URL**

  /users/me

* **Method:**

  `GET`

*  **URL Params**

   None

* **Body Params**

  None

* **Sample Call:**

  ```javascript
    fetch('https://subarashii-backend.vercel.app/api/users/me', {
        method: 'GET',
        headers: {
            Content-Type: 'application/json',
            Authorization: 'Bearer token'
        }
    })
  ```

### Update user
Update user informations
* **URL**

  /users

* **Method:**

  `PUT`

*  **URL Params**

  None


* **Body Params**

  `username=[string]`

  `email=[string, email, min(6)]`

* **Sample Call:**

  ```javascript
    fetch('https://subarashii-backend.vercel.app/api/users', {
        method: 'DELETE',
        headers: {
            Content-Type: 'application/json',
            Authorization: 'Bearer token'
        },
        body: {
            "username": "Alfred",
            "email": "alfred@gmail.com"
        }
    })
  ```

### Update user password
Update user password
* **URL**

  /users/password

* **Method:**

  `PUT`

*  **URL Params**

  None


* **Body Params**

  `previousPassword=[string, required]`

  `password=[string, min(6), required]`

  `confirmPassword=[string, same(password), required]`

* **Sample Call:**

  ```javascript
    fetch('https://subarashii-backend.vercel.app/api/users/password', {
        method: 'DELETE',
        headers: {
            Content-Type: 'application/json',
            Authorization: 'Bearer token'
        },
        body: {
            "previousPassword": "asghfdozhg",
            "password": "gieaofjgoefa",
            "confirmPassword": "gieaofjgoefa"
        }
    })
  ```

### Forgot password -> Generate reset password key
Generate and send reset password key to reset password
* **URL**

  /users/password/reset/key

* **Method:**

  `POST`

*  **URL Params**

  None


* **Body Params**

  `email=[string, email, required]`

* **Sample Call:**

  ```javascript
    fetch('https://subarashii-backend.vercel.app/api/users/password/reset/key', {
        method: 'DELETE',
        headers: {
            Content-Type: 'application/json'
        },
        body: {
            "email": "alfred@gmail.com"
        }
    })
  ```

### Forgot password -> Reset password
Reset password of user
* **URL**

  /users/password/reset

* **Method:**

  `POST`

*  **URL Params**

  None


* **Body Params**

  `email=[string, email, required]`

  `key=[string, required]`

  `password=[string, required]`

  `confirmPassword=[string, same(password), required]`

* **Sample Call:**

  ```javascript
    fetch('https://subarashii-backend.vercel.app/api/users/password/reset', {
        method: 'DELETE',
        headers: {
            Content-Type: 'application/json'
        },
        body: {
            "email": "alfred@gmail.com",
            "key": "9e7d5b481806bca91bf6bed60ae98efb3ef0885d60e8a6f7449ad66e1c847759a5fa9e4471e0bdf32c7f59819e258a873978d6e3138723a938f85a807e8742e5",
            "password": "Ila1552364",
            "confirmPassword": "Ila1552364"
        }
    })
  ```

## **Stats :**

### Stat
  Retrieve all the stats of the user

* **URL**

  /stats

* **Method:**

  `GET`
  
*  **URL Params**

   None

* **Body Params**

  None

* **Sample Call:**

  ```javascript
    fetch('https://subarashii-backend.vercel.app/api/stats', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer token'
        }
    })
  ```
## **Comments :**

### Create

* **URL**

  /comments

* **Method:**

  `POST`
  
*  **URL Params**

   None

* **Body Params**

  **Required:**
 
   `content=[string]`

   `animeId=[number]`

* **Sample Call:**

  ```javascript
    fetch('https://subarashii-backend.vercel.app/api/comments', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer token'
        },
        body: {
            content: 'This is a comment',
            animeId: 1234
        }
    })
  ```

### Update
  Should be yours comment
* **URL**

  /comments/:id

* **Method:**

  `PUT`
  
*  **URL Params**

   `id=[string]`

* **Body Params**

  **Required:**
 
   `content=[string]`

* **Sample Call:**

  ```javascript
    fetch('https://subarashii-backend.vercel.app/api/comments/1', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer token'
        },
        body: {
            content: 'This is a comment'
        }
    })
  ```

### Delete
  Should be yours comment
* **URL**

  /comments/:id

* **Method:**

  `DELETE`
  
*  **URL Params**

   `id=[string]`

* **Body Params**

  None

* **Sample Call:**

  ```javascript
    fetch('https://subarashii-backend.vercel.app/api/comments/1', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer token'
        }
    })
  ```

### Anime comments
* **URL**

  /comments/anime/:animeId

* **Method:**

  `GET`
  
*  **URL Params**

   `animeId=[number]`

* **Body Params**

  None

* **Sample Call:**

  ```javascript
    fetch('https://subarashii-backend.vercel.app/api/comments/anime/1234', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer token'
        }
    })
  ```

### Like comment
* **URL**

  /comments/:id/like

* **Method:**

  `PATCH`
  
*  **URL Params**

   `id=[number]`

* **Body Params**

  None

* **Sample Call:**

  ```javascript
    fetch('https://subarashii-backend.vercel.app/api/comments/1/like', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer token'
        }
    })
  ```

### Dislike comment
* **URL**

  /comments/:id/dislike

* **Method:**

  `PATCH`
  
*  **URL Params**

   `id=[number]`

* **Body Params**

  None

* **Sample Call:**

  ```javascript
    fetch('https://subarashii-backend.vercel.app/api/comments/1/dislike', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer token'
        }
    })
  ```
### Remove comment
Must be an admin
* **URL**

  /comments/:id/remove

* **Method:**

  `DELETE`
  
*  **URL Params**

   `id=[number]`

* **Body Params**

  None

* **Sample Call:**

  ```javascript
    fetch('https://subarashii-backend.vercel.app/api/comments/1/remove', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer token'
        }
    })
  ```


  
## **Lists :**
### My list
* **URL**

  /lists

* **Method:**

  `GET`
  
*  **URL Params**

   None

* **Body Params**

  None

* **Sample Call:**

  ```javascript
    fetch('https://subarashii-backend.vercel.app/api/lists', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer token'
        }
    })
  ```

### Anime list
* **URL**

  /lists/:id/animes

* **Method:**

  `GET`
  
*  **URL Params**

   `id=[number]`

* **Body Params**

  None

* **Sample Call:**

  ```javascript
    fetch('https://subarashii-backend.vercel.app/api/lists/1/animes', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer token'
        }
    })
  ```

### Create
* **URL**

  /lists

* **Method:**

  `POST`
  
*  **URL Params**

    None

* **Body Params**

   **Required**

  `label[string]`

  **Not required**

  `deletable[boolean]`


* **Sample Call:**

  ```javascript
    fetch('https://subarashii-backend.vercel.app/api/lists', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer token'
        },
        body: {
            label: 'New list'
        }
    })
  ```

### Delete
* **URL**

  /lists/:id

* **Method:**

  `DELETE`
  
*  **URL Params**

    `id[number]`

* **Body Params**

   None

* **Sample Call:**

  ```javascript
    fetch('https://subarashii-backend.vercel.app/api/lists/1', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer token'
        }
    })
  ```

### Add anime to list
* **URL**

  /lists/:id/anime/add

* **Method:**

  `PATCH`
  
*  **URL Params**

    `id[string]`

* **Body Params**

   **Required**

   `animeId[number]`

   `animeCategories[array(string)]`

* **Sample Call:**

  ```javascript
    fetch('https://subarashii-backend.vercel.app/api/lists/1/anime/add', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer token'
        },
        body: { 
            animeId: 1,
            animeCategories: ['Adventure', 'Action']
        }
    })
  ```

### Remove anime to list
* **URL**

  /lists/:id/anime/remove

* **Method:**

  `PATCH`
  
*  **URL Params**

    `id[string]`

* **Body Params**

   None

* **Sample Call:**

  ```javascript
    fetch('https://subarashii-backend.vercel.app/api/lists/1/anime/remove', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer token'
        }
    })
  ```
