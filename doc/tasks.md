# Tasks API Spec

# GET Tasks

endpoint : GET /tasks
response body (Success)

```json
{
  "message": "Berhasil mendapatkan data tugas!",
  "data": [
    {
      "id": 1,
      "matkul": "Algoritma dan Pemrograman",
      "matkul_id": 3,
      "dosen": "Pak Rasyid",
      "title": "Membuat flowchart sorting",
      "description": [
        "dibuat menggunakan flowchart.io",
        "dicoding di kertas dan dicompile di otak"
      ],
      "deadline": ""
    },
    {
      "id": 2,
      "matkul": "Pendidikan Pancasila",
      "matkul_id": 2,
      "dosen": "Pak Fajar",
      "title": "Membuat video mengkritik pemerintah",
      "description": [
        "diupload di Instagram, dengan hashtag mosi tidak percaya fufufafa"
      ],
      "deadline": ""
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
