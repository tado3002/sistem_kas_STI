# Auth API spec

## Register

Endpoint : POST /auth/register

Request Body :

```json
{
  "usernameByNIM": "tado3923",
  "password": "testing123"
}
```

Response Body (Success):

```json
{
  "message": "Registrasi berhasil!"
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
  "usernameByNIM": "tado3923",
  "password": "testing123"
}
```

Response Body (Success):

```json
{
  "message": "Login berhasil!",
  "data": {
    "accessToken": "malasmengoding"
  }
}
```

Response Body (Failed):

```json
{
  "message": "Username atau password salah!"
}
```
