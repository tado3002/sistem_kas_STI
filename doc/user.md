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
            "id" : 1,
            "name" : "m. tado",
            "username" : "tado3923",
            "role" : "admin"
        },
        {
            "id" : 2,
            "name" : "m. stalin",
            "username" : "uraaa1945",
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

## Update Users

Endpoint : PUT /users/[current]

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
      "id" : 1,
      "name" : "m. tado",
      "username" : "tado3923",
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

Endpoint : DELETE /users

Headers :

- authorization: token

Response Body (Success)

```json
{
    "message" : "Berhasil menghapus data user!"
    "data" :
        {
            "id" : 1,
            "name" : "m. tado",
            "username" : "tado3923",
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
