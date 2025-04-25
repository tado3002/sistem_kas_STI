## Dosen API spec

## Get Dosens

Endpoint : GET /dosens

Response Body (Success)

```json
{
    "message" : "Berhasil mendapatkan data-data dosen"
    "data" : [
        {
            "id" : 1,
            "matkul" : "Pendidikan Pancasila",
            "name" : "Pak Fajar",
            "phone":"082146482238",
            "whatsapp":"linkwatsapp"
        },
        {
            "id" : 2,
            "matkul" : "Algoritma Pemrograman",
            "name" : "Pak Rasyid",
            "phone":"086482238",
            "whatsapp":"linkwatsapp"
        },
    ]
}
```

Response Body (Failed)

```json
{
  "message": "Internal server error!"
}
```

## Post Dosen

Endpoint : POST /dosens

Headers :

- authorization: token

Request Body

```
{
    "matkul" : "Algoritma Pemrograman",
    "name" : "Pak Rasyid",
    "phone":"086482238",
    "whatsapp":"linkwatsapp"
}

```

Response Body (Success)

```json
{
    "message" : "Berhasil menambahkan data dosen"
    "data" : {
        "id" : 2,
        "matkul" : "Algoritma Pemrograman",
        "name" : "Pak Rasyid",
        "phone":"086482238",
        "whatsapp":"linkwatsapp"
    }
}
```

Response Body (Failed)

```json
{
  "message": "Akses hanya untuk admin!"
}
```

## Update Dosen

Endpoint : PATCH /dosens/:id

Headers :

- authorization: token

Request Body

```
{
    "matkul" : "Algoritma Pemrograman", //opsional
    "name" : "Pak Rasyid", //opsional
    "phone":"086482238", //opsional
    "whatsapp":"linkwatsapp" //opsional
}

```

Response Body (Success)

```json
{
    "message" : "Berhasil memperbarui data dosen"
    "data" : {
        "id" : 2,
        "matkul" : "Algoritma Pemrograman",
        "name" : "Pak Rasyid",
        "phone":"086482238",
        "whatsapp":"linkwatsapp"
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

Endpoint : DELETE /dosens/:id

Headers :

- authorization: token

Response Body (Success)

```json
{
    "message" : "Berhasil menghapus data dosen!"
    "data" : {
        "id" : "2",
        "matkul" : "Algoritma Pemrograman",
        "name" : "Pak Rasyid",
        "phone":"086482238",
        "whatsapp":"linkwatsapp"
    }
}
```

Response Body (Failed)

```json
{
  "message": "Akses hanya untuk admin!"
}
```
