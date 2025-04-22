# Tasks API Spec

# GET Tasks

endpoint : GET /tasks //Default: page=1, size=10, sort=desc
response body (Success)

```json
{
  "message": "Berhasil mendapatkan data tugas!",
  "data": [
    {
      "id": 1,
      "dosen": {
        "id": 2,
        "matkul": "Algoritma Pemrograman",
        "name": "Pak Rasyid",
        "phone": "086482238",
        "whatsapp": "linkwatsapp"
      },
      "title": "Membuat flowchart sorting",
      "description": "dicoding di kertas dan dicompile di otak",
      "deadline": "2025-04-17T02:27:54:281Z",
      "createdAt": "2025-04-17T02:27:54:281Z"
    }
  ],
  "page": {
    "size": 5,
    "totalElements": 50,
    "totalPages": 10,
    "number": 1
  }
}
```

# GET Tasks By id

endpoint : GET /tasks/:id
response body (Success)

```json
{
  "message": "Berhasil mendapatkan data tugas!",
  "data": {
    "id": 1,
    "dosen": {
      "id": 2,
      "matkul": "Algoritma Pemrograman",
      "name": "Pak Rasyid",
      "phone": "086482238",
      "whatsapp": "linkwatsapp"
    },
    "title": "Membuat flowchart sorting",
    "description": "dicoding di kertas dan dicompile di otak",
    "deadline": "2025-04-17T02:27:54:281Z",
    "createdAt": "2025-04-17T02:27:54:281Z"
  }
}
```

# GET Tasks is pending

endpoint : GET /tasks/pending
response body (Success)

```json
{
  "message": "Berhasil mendapatkan data tugas yang belum deadline!",
  "data": [
    {
      "id": 1,
      "dosen": {
        "id": 2,
        "matkul": "Algoritma Pemrograman",
        "name": "Pak Rasyid",
        "phone": "086482238",
        "whatsapp": "linkwatsapp"
      },
      "title": "Membuat flowchart sorting",
      "description": "dicoding di kertas dan dicompile di otak",
      "deadline": "2025-04-17T02:27:54:281Z",
      "createdAt": "2025-04-17T02:27:54:281Z"
    }
  ]
}
```

# Create Tasks

Endpoint : POST /tasks

Headers :

- authorization: token

Request Body

```
{
    "dosenId" : 2,
    "title" : "Membuat flowchart sorting"
    "description":"dicoding di kertas dan dicompile di otak",
    "deadline": "2025-04-17"
}

```

Response body (Success)

```json
{
  "message": "Berhasil menambahkan data tugas!"
}
```

Response body (Error)

```json
{
  "message": "Internal Server Error"
}
```

# Update Tasks

Endpoint : PATCH /tasks/:id

- authorization: token

Request Body

```
{
    "dosenId" : 2,
    "title" : "Membuat flowchart segitiga"
    "description":"dicoding di kertas dan dicompile di otak",
    "deadline": "2025-04-17"
}

```

Response body (Success)

```json
{
  "message": "Berhasil mengupdate data tugas!",
  "data": {
    "id": 1,
    "dosen": {
      "id": 2,
      "matkul": "Algoritma Pemrograman",
      "name": "Pak Rasyid",
      "phone": "086482238",
      "whatsapp": "linkwatsapp"
    },
    "title": "Membuat flowchart segitiga",
    "description": "dicoding di kertas dan dicompile di otak",
    "deadline": "2025-04-17T02:27:54:281Z",
    "createdAt": "2025-04-17T02:27:54:281Z"
  }
}
```

Response body (Error)

```json
{
  "message": "Internal Server Error"
}
```

# DELETE Tasks

Endpoint : DELETE /tasks/:id

- authorization: token

Response body (Success)

```json
{
  "message": "Berhasil menghapus data tugas!"
}
```

Response body (Error)

```json
{
  "message": "Internal Server Error"
}
```
