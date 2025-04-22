# User API spec

## Get Users

Endpoint : GET /users

Headers :

- authorization: token

Response Body (Success)

```json
{
    "message" : "Berhasil mendapatkan data-data user"
    "data" : [
        {
            "name" : "m. tado",
            "usernameByNIM" : 24121024,
            "role" : "admin"
        },
        {
            "name" : "m. stalin",
            "usernameByNIM" : 24121024,
            "role" : "user"
        },
    ]
}
```

Response Body (Failed)

```json
{
  "message": "Akses hanya untuk admin!"
}
```

## Get Users Profile

Endpoint : GET /users/profile

Headers :

- authorization: token

Response Body (Success)

```json
{
    "message" : "Berhasil mendapatkan data-data user"
    "data" : {
        "name" : "m. tado",
        "usernameByNIM" : 24121024,
        "role" : "admin"
    },
}
```

Response Body (Failed)

```json
{
  "message": "Akses hanya untuk admin!"
}
```

## Update Users

Endpoint : PUT /users/:NIM

Headers :

- authorization: token

Request Body

```
{
    "name" : "muh tado", //opsional
    "password" : "12345678" //opsional
}

```

Response Body (Success)

```json
{
    "message" : "Berhasil memperbarui data user"
    "data" : {
      "name" : "m. tado",
      "usernameByNIM" : 32423,
      "role" : "admin"
    }
}
```

Response Body (Failed)

```json
{
  "message": "Akses hanya untuk admin!"
}
```

## Delete Users

Endpoint : DELETE /users/:NIM

Headers :

- authorization: token

Response Body (Success)

```json
{
  "message": "Berhasil menghapus data user!",
  "data": {
    "name": "m. tado",
    "usernameByNIM": "tado3923",
    "role": "admin"
  }
}
```

Response Body (Failed)

```json
{
  "message": "Akses hanya untuk admin!"
}
```
