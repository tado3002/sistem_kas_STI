# Auth API spec

## Register

Endpoint : POST /auth/register

Request Body :

```json
{
  "username": "tado3923",
  "name": "m. tado"
}
```

Response Body (Success):

```json
{
  "message": "Registrasi berhasil!",
  "data": {
    "name": "m. tado",
    "username": "tado3923"
  }
}
```

Response Body (Failed):

```json
{
  "message": "username telah dipakai!"
}
```

## Login

Endpoint : POST /auth/login

Request Body :

```json
{
  "username": "tado3923",
  "password": "testing123"
}
```

Response Body (Success):

```json
{
  "message": "Login berhasil!",
  "data": {
    "user" : {
        "name" : "m. tado"
        "username" : "tado3923",
        "role" : "admin"
    "accessToken" : "malasmengoding"
    }
  }
}
```

Response Body (Failed):

```json
{
  "message": "Username atau password salah!",
  "data": {
    "accessToken": null
  }
}
```
