### Submission: Proyek OpenMusic API versi 1

Terdapat 5 kriteria utama yang harus Anda penuhi dalam membuat proyek OpenMusic API.


## Kriteria 1: Konfigurasi Proyek Node.js
Proyek Node.js yang Anda kirimkan wajib memiliki konfigurasi sesuai yang dijelaskan di bawah ini:

Aplikasi HTTP Server harus bisa dijalankan dengan perintah npm run start. Pastikan berkas package.json terdapat scripts start yang diatur untuk menjalankan HTTP Server.
Memanfaatkan environment variable HOST dan PORT untuk menetapkan host dan port jalannya aplikasi HTTP Server.


## Kriteria 2 : Pengelolaan Data Album
API harus menyediakan endpoint untuk pengelolaan album dengan spesifikasi berikut:

[tabel](https://dicoding-web-img.sgp1.cdn.digitaloceanspaces.com/original/academy/dos:b285d8d8f11c5d2f72d5ab51df9376e820211215133446.png)
*any: merupakan nilai string apa pun selama tidak kosong.


Untuk lebih jelasnya, berikut adalah struktur response body yang harus ditampilkan pada endpoint:

GET /albums/{id} <br>
{ <br>
  "status": "success", <br>
  "data": { <br>
    "album": { <br>
      "id": "album-Mk8AnmCp210PwT6B", <br>
      "name": "Viva la Vida", <br>
      "year": 2008 <br>
    } <br>
  } <br>
} <br>


##Kriteria 3 : Pengelolaan Data Song
API harus menyediakan endpoint untuk pengelolaan song (lagu) dengan spesifikasi berikut:

[tabel](https://dicoding-web-img.sgp1.cdn.digitaloceanspaces.com/original/academy/dos:49e70f7e35f9fa4ef0bd7500f3716c1b20220304101538.png)
*?: Boleh null atau undefined.
*any: merupakan nilai string apa pun selama nilainya tidak kosong.

Untuk lebih jelasnya, berikut adalah struktur response body yang harus ditampilkan pada endpoint:
GET /songs
{
  "status": "success",
  "data": {
    "songs": [
      {
        "id": "song-Qbax5Oy7L8WKf74l",
        "title": "Life in Technicolor",
        "performer": "Coldplay"
      },
      {
        "id": "song-poax5Oy7L8WKllqw",
        "title": "Centimeteries of London",
        "performer": "Coldplay"
      },
      {
        "id": "song-Qalokam7L8WKf74l",
        "title": "Lost!",
        "performer": "Coldplay"
      }
    ]
  }
}

GET /songs/{id}
{
  "status": "success",
  "data": {
    "song": {
        "id": "song-Qbax5Oy7L8WKf74l",
        "title": "Life in Technicolor",
        "year": 2008,
        "performer": "Coldplay",
        "genre": "Indie",
        "duration": 120,
        "albumId": "album-Mk8AnmCp210PwT6B"
    }
  }
}


Objek song yang disimpan harus memiliki struktur seperti contoh di bawah ini:
{ <br>
  "id": "song-Qbax5Oy7L8WKf74l", <br>
  "title": "Life in Technicolor", <br>
  "year": 2008, <br>
  "performer": "Coldplay", <br>
  "genre": "Indie", <br>
  "duration": 120, <br>
  "albumId": "album-Mk8AnmCp210PwT6B" <br>
}


## Kriteria 4 : Menerapkan Data Validation
Wajib menerapkan proses Data Validation pada Request Payload sesuai spesifikasi berikut: <br>

POST /albums <br>
name : string, required. <br>
year : number, required. <br>

PUT /albums <br>
name : string, required. <br>
year : number, required. <br>

POST /songs <br>
title : string, required. <br>
year : number, required. <br>
genre : string, required. <br>
performer : string, required. <br>
duration : number. <br>
albumId: string. <br>

PUT /songs <br>
title : string, required. <br>
year : number, required. <br>
genre : string, required. <br>
performer : string, required. <br>
duration : number. <br>
albumId : string. <br>


## Kriteria 5 : Penanganan Eror (Error Handling)
Ketika proses validasi data pada request payload tidak sesuai (gagal), server harus mengembalikan response: <br>
  status code: 400 (Bad Request) <br>
  response body:  <br>
   status: fail <br>
   message: <apa pun selama tidak kosong> <br>
Ketika pengguna mengakses resource yang tidak ditemukan, server harus mengembalikan response: <br>
  status code: 404 (Not Found) <br>
  response body: <br>
   status: fail <br>
   message: <apa pun selama tidak kosong> <br>
Ketika terjadi server eror, server harus mengembalikan response: <br>
  status code: 500 (Internal Server Error) <br>
  response body: <br>
   status: error <br>
   message: <apa pun selama tidak kosong> <br>


## Kriteria 6 : Menggunakan Database dalam Menyimpan Data album dan lagu
Data lagu harus disimpan di dalam database menggunakan PostgreSQL agar ketika di-restart data tidak akan hilang. <br>
Wajib menggunakan teknik migrations dengan package node-pg-migrate dalam mengelola struktur tabel pada database. <br>
Kami mengedepankan penggunaan SQL dalam mengelola database, jika Anda menggunakan ORM, submission akan ditolak. <br>
Wajib menyimpan nilai host, post, maupun kredensial dalam mengakses database pada environment variable dengan ketentuan: <br>

PGUSER : menyimpan nilai user untuk mengakses database. <br>
PGPASSWORD : menyimpan nilai password dari user database. <br>
PGDATABASE : menyimpan nilai nama database yang digunakan. <br>
PGHOST : menyimpan nilai host yang digunakan oleh database. <br>
PGPORT :  menyimpan nilai port yang digunakan oleh database. <br>

Wajib menggunakan package dotenv serta berkas .env dalam mengelola environment variable.


### Kriteria Opsional
Selain kriteria utama, terdapat kriteria opsional yang yang dapat Anda penuhi agar mendapat nilai yang baik.

## Kriteria Opsional 1: Memunculkan daftar lagu di dalam detail album
API harus memunculkan daftar lagu di dalam album pada endpoint GET /albums/{albumId}. Berikut contoh response yang harus dihasilkan: <br>

{ <br>
  "status": "success", <br>
  "data": { <br>
    "album": { <br>
      "id": "album-Mk8AnmCp210PwT6B", <br>
      "name": "Viva la Vida", <br>
      "year": 2008, <br>
      "songs": [ <br>
        { <br>
          "id": "song-Qbax5Oy7L8WKf74l", <br>
          "title": "Life in Technicolor", <br>
          "performer": "Coldplay" <br>
        }, <br>
        { <br>
          "id": "song-poax5Oy7L8WKllqw", <br>
          "title": "Centimeteries of London", <br>
          "performer": "Coldplay" <br>
        }, <br>
        { <br>
          "id": "song-Qalokam7L8WKf74l", <br>
          "title": "Lost!", <br>
          "performer": "Coldplay" <br>
        } <br>
      ] <br>
    } <br>
  } <br>
} <br>


## Kriteria Opsional 2: Query Parameter untuk Pencarian Lagu
Menerapkan query parameter pada endpoint GET /songs untuk fitur pencarian lagu. Berikut ketentuan parameternya: <br>

?title: mencari lagu berdasarkan judul lagu. <br>
?performer: mencari lagu berdasarkan performer. <br>

Catatan: Penggunaan kedua parameter tersebut dapat dikombinasikan. <br>

# Saran
Memenuhi kriteria opsional yang diberikan. <br>
Menggunakan ESLint dan salah satu style guide agar gaya penulisan kode JavaScript lebih konsisten dan menghindari disable linter yang tidak diperlukan. <br>
Menuliskan kode dengan bersih: <br>
Menghapus kode yang redundan (tidak perlu). <br>
Menghapus impor kode yang tidak digunakan. <br>
Menghapus berkas yang tidak digunakan.
