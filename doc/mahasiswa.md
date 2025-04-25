## Mahasiswa API spec

# Get Mahasiswa

Endpoint : GET /mahasiswa

Response Body (success)

```json
{
  "message": "Berhasil mendapatkan data mahasiswa!",
  "data": [
    {
      "NIM": 29322,
      "name": "Otong",
      "phone": "0843242323"
    }
  ]
}
```

Response Body (failed)

```json
{
  "message": "Internal server error!"
}
```

# Get Mahasiswa by NIM

Endpoint : GET /mahasiswa/:NIM

Response Body (success)

```json
{
  "message": "Berhasil mendapatkan data mahasiswa!",
  "data": {
    "NIM": 29322,
    "name": "Otong",
    "phone": "0843242323"
  }
}
```

Response Body (failed)

```json
{
  "message": "Mahasiswa tidak ditemukan!"
}
```

# Post Mahasiswa

Endpoint : POST /mahasiswa

Headers :

- authorization : tokenAccess

Request Body

```json
{
  "NIM": 29322,
  "name": "Otong",
  "phone": "0843242323"
}
```

Response Body (success)

```json
{
  "message": "Berhasil menambahkan data mahasiswa!",
  "data": {
    "NIM": 29322,
    "name": "Otong",
    "phone": "0843242323"
  }
}
```

Response Body (failed)

```json
{
  "message": "NIM mahasiswa telah digunakan!"
}
```

# Update Mahasiswa

Endpoint : PATCH /mahasiswa/:NIM

Headers :

- authorization : tokenAccess

Request Body

```json
{
  "name": "Otong", //opsional
  "phone": "0843242323" //opsional
}
```

Response Body (success)

```json
{
  "message": "Berhasil memperbarui data mahasiswa!",
  "data": {
    "NIM": 29322,
    "name": "Otong",
    "phone": "0843242323"
  }
}
```

Response Body (failed)

```json
{
  "message": "NIM tidak dapat ditemukan!"
}
```

# Delete Mahasiswa

Endpoint : DELETE /mahasiswa/:NIM

Headers :

- authorization : tokenAccess

Response Body (success)

```json
{
  "message": "Berhasil menghapus data mahasiswa!",
  "data": {
    "NIM": 29322,
    "name": "Otong",
    "phone": "0843242323"
  }
}
```

Response Body (failed)

```json
{
  "message": "NIM tidak dapat ditemukan!"
}
```
