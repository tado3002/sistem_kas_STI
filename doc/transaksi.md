## Transaksi API spec

# Get Transaksi

Endpoint : GET /transaksi //Default: page=1, size=10, sort=desc

Response body (Success)

```json
{
    "message" : "Berhasil mendapatkan semua data transaksi"
    "data" : [
        {
            "id" : 1,
            "nama" : "Muhammad Murtadlo"
            "NIM_mahasiswa" : 24121026,
            "nominal" : 30.000,
            "type" : "pemasukan",
            "tanggal" : "2025-01-10T18:42:32.424Z",
            "deskripsi" : "uang kas"
        },
        {
            "id" : 2,
            "nama" : "Muhammad Murtadlo"
            "NIM_mahasiswa" : 24121025
            "nominal" : 10.000,
            "type" : "pengeluaran",
            "tanggal" : "2025-01-10T18:42:32.424Z",
            "deskripsi" : "beli spidol"
        },
    ],
    "page": {
        "current": 1,
        "size":10,
        "total_page": 5,
        "total_item": 50,
        "Links": [
            {
                "active": false,
                "label": "prev",
                "url": null
            },
            {
                "active": true,
                "label": "next",
                "url": "/transaksi?page=2&per_page=10"
            },
            {
                "active": false,
                "label": "first",
                "url": null
            },
            {
                "active": true,
                "label": "last",
                "url": "/transaksi?page=5&per_page=10"
            },
        ]
    }
}

```

Response body (Error)

```json
{
  "message": "Internal server error!"
}
```

# Get Transaksi By ID

Endpoint : GET /transaksi/1

Response body (Success)

```json
{
    "message" : "Berhasil mendapatkan semua data transaksi"
    "data" : {

         "id" : 1,
         "nama" : "Muhammad Murtadlo"
         "NIM_mahasiswa" : 24121026,
         "nominal" : 30.000,
         "type" : "pemasukan",
         "tanggal" : "2025-01-10T18:42:32.424Z",
         "deskripsi" : "uang kas"
    },
}

```

Response body (Error)

```json
{
  "message": "Internal server error!"
}
```

# Get Transaksi By NIM

Endpoint : GET /transaksi/NIM/24121026

Response body (Success)

```json
{
    "message" : "Berhasil mendapatkan semua data transaksi"
    "data" : [
        {
            "id" : 1,
            "nama" : "Muhammad Murtadlo"
            "NIM_mahasiswa" : 24121026,
            "nominal" : 30.000,
            "type" : "pemasukan",
            "tanggal" : "2025-01-10T18:42:32.424Z",
            "deskripsi" : "uang kas"
        },
        {
            "id" : 2,
            "nama" : "Muhammad Murtadlo"
            "NIM_mahasiswa" : 24121024
            "nominal" : 10.000,
            "type" : "pengeluaran",
            "tanggal" : "2025-01-10T18:42:32.424Z",
            "deskripsi" : "beli spidol"
        },
    ]
}

```

Response body (Error)

```json
{
  "message": "NIM tidak ditemukan!"
}
```

# Create Transaksi

Endpoint : POST /transaksi

Headers:

- authorization : token

Request body

```json
{
   "NIM_mahasiswa" : 24121025
   "nominal" : 10000,
   "type" : "pengeluaran",
   "deskripsi" : "beli spidol"
}

```

Response body (Success)

```json
{
    "message" : "Berhasil membuat data transaksi"
    "data" : {
        "id" : 2,
        "nama" : "Muhammad Murtadlo"
        "NIM_mahasiswa" : 24121025,
        "nominal" : 10000,
        "type" : "pengeluaran",
        "tanggal" : "2025-01-10T18:42:32.424Z",
        "deskripsi" : "beli spidol"
    },

}

```

Response body (Error)

```json
{
  "message": "!",
  "errors": {
    "NIM_mahasiswa": ["must be not null", "must be integer"],
    "nominal": ["must be not null", "must be integer"],
    "type": ["must be not null", "field doesnt exits"],
    "deskripsi": ["must be not null"]
  }
}
```

# Update Transaksi

Endpoint : PUT /transaksi/:id

Headers:

- authorization : token

Request body

```json
{
  "NIM_mahasiswa": 24121025, //opsional
  "nominal": 10000, //opsional
  "type": "pengeluaran", //opsional
  "deskripsi": "beli spidol" //opsional
}
```

Response body (Success)

```json
{
    "message" : "Berhasil mengupdate data transaksi"
    "data" : {
        "id" : 2,
        "nama" : "Muhammad Murtadlo"
        "NIM_mahasiswa" : 24121025,
        "nominal" : 10000,
        "type" : "pengeluaran",
        "tanggal" : "2025-01-10T18:42:32.424Z",
        "deskripsi" : "beli spidol"
    },

}

```

Response body (Error)

```json
{
  "message": "Akses hanya untuk admin!"
}
```

# Remove Transaksi

Endpoint : DELETE /transaksi/:id

Headers:

- authorization : token

Response body (Success)

```json
{
    "message" : "Berhasil menghapus data transaksi"
    "data" : {
        "id" : 2,
        "nama" : "Muhammad Murtadlo"
        "NIM_mahasiswa" : 24121025,
        "nominal" : 10000,
        "type" : "pengeluaran",
        "tanggal" : "2025-01-10T18:42:32.424Z",
        "deskripsi" : "beli spidol"
    },

}

```

Response body (Error)

```json
{
  "message": "Akses hanya untuk admin!"
}
```
