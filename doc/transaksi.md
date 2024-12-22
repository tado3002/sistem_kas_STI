## Transaksi API spec

# Get Transaksi

Endpoint : GET /transaksi

Response body (Success)

```json
{
    "message" : "Berhasil mendapatkan semua data transaksi"
    "data" : [
        {
            "id" : 1,
            "NIM_mahasiswa" : 24121026,
            "nominal" : 30.000,
            "type" : "pemasukan",
            "tanggal" : "10/12/2024",
            "deskripsi" : "uang kas"
        },
        {
            "id" : 2,
            "NIM_mahasiswa" : 24121025
            "nominal" : 10.000,
            "type" : "pengeluaran",
            "tanggal" : "11/12/2024",
            "deskripsi" : "beli spidol"
        },
    ]
}

```

Response body (Error)

```json
{
  "message": "Internal server error!"
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
   "nominal" : 10.000,
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
        "NIM_mahasiswa" : 24121025,
        "nominal" : 10.000,
        "type" : "pengeluaran",
        "tanggal" : "10/12/2024",
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

# Update Transaksi

Endpoint : PUT /transaksi/:id

Headers:

- authorization : token

Request body

```json
{
  "NIM_mahasiswa": 24121025, //opsional
  "nominal": 10.0, //opsional
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
        "NIM_mahasiswa" : 24121025,
        "nominal" : 10.000,
        "type" : "pengeluaran",
        "tanggal" : "10/12/2024",
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
        "NIM_mahasiswa" : 24121025,
        "nominal" : 10.000,
        "type" : "pengeluaran",
        "tanggal" : "10/12/2024",
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
