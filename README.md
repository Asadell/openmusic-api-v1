testing:
newman run Open-Music-API-V1-Test.postman_collection.json --environment OpenMusic-API-Test.postman_environment.json

albums'

semua albums
valid:
newman run Open-Music-API-V1-Test.postman_collection.json --folder 'Add Album with Valid Payload' --folder 'Get Detail Album with Valid Id' --folder 'Edit Album with Valid Id' --folder 'Delete Album with Valid Id' --environment OpenMusic-API-Test.postman_environment.json

all:
newman run Open-Music-API-V1-Test.postman_collection.json --folder 'Add Album with Invalid Payload' --folder 'Add Album with Valid Payload' --folder 'Get Detail Album with Invalid Id' --folder 'Get Detail Album with Valid Id' --folder 'Edit Album with Invalid Payload' --folder 'Edit Album with Invalid Id' --folder 'Edit Album with Valid Id' --folder 'Delete Album with Invalid Id' --folder 'Delete Album with Valid Id' --environment OpenMusic-API-Test.postman_environment.json

"menjalankan request hanya untuk 'POST /albums'"
newman run Open-Music-API-V1-Test.postman_collection.json --folder 'Add Album with Invalid Payload' --environment OpenMusic-API-Test.postman_environment.json

"menjalankan request hanya untuk 'POST /albums' n 'GET /albums/{id}'"
newman run Open-Music-API-V1-Test.postman_collection.json --folder 'Add Album with Valid Payload' --folder 'Get Detail Album with Valid Id' --environment OpenMusic-API-Test.postman_environment.json

"menjalankan request hanya untuk 'POST /albums' n 'PUT /albums/{id}'"
newman run Open-Music-API-V1-Test.postman_collection.json --folder 'Add Album with Valid Payload' --folder 'Edit Album with Valid Id' --environment OpenMusic-API-Test.postman_environment.json

"menjalankan request hanya untuk 'POST /albums' n 'DELETE /albums/{id}'"
newman run Open-Music-API-V1-Test.postman_collection.json --folder 'Add Album with Valid Payload' --folder 'Delete Album with Valid Id' --environment OpenMusic-API-Test.postman_environment.json

"menjalankan request hanya untuk 'POST /albums' n 'DELETE /albums/{id}'"
newman run Open-Music-API-V1-Test.postman_collection.json --folder 'Add Album with Valid Payload' --folder 'Get Detail Album with Valid Id' --folder 'Edit Album with Valid Id' --folder 'Delete Album with Valid Id' --environment OpenMusic-API-Test.postman_environment.json

songs

semua songs

valid:
newman run Open-Music-API-V1-Test.postman_collection.json --folder 'Add Song with Valid Payload' --folder '[No Test] Add Song with Valid Payload' --folder 'Get All Songs' --folder 'Get Detail Songs with Valid Id' --folder 'Edit Song with Valid Id' --folder 'Delete Song with Valid Id' --environment OpenMusic-API-Test.postman_environment.json

newman run Open-Music-API-V1-Test.postman_collection.json --folder 'Add Song with Invalid Payload' --folder 'Add Song with Valid Payload' --folder '[No Test] Add Song with Valid Payload' --folder 'Get All Songs' --folder 'Get Detail Songs with Invalid Id' --folder 'Get Detail Songs with Valid Id' --folder 'Edit Song with Invalid Payload' --folder 'Edit Song with Invalid Id' --folder 'Edit Song with Valid Id' --folder 'Delete Song with Invalid Id' --folder 'Delete Song with Valid Id' --environment OpenMusic-API-Test.postman_environment.json

"menjalankan request hanya untuk 'POST /songs'"
newman run Open-Music-API-V1-Test.postman_collection.json --folder 'Add Song with Valid Payload' --environment OpenMusic-API-Test.postman_environment.json

"menjalankan request hanya untuk 'GET /songs' n '"
newman run Open-Music-API-V1-Test.postman_collection.json --folder 'Add Song with Valid Payload' --folder '[No Test] Add Song with Valid Payload' --folder 'Get All Songs' --environment OpenMusic-API-Test.postman_environment.json

"menjalankan request hanya untuk 'GET /songs/{id}'"
newman run Open-Music-API-V1-Test.postman_collection.json --folder 'Add Song with Valid Payload' --folder 'Get Detail Songs with Valid Id' --environment OpenMusic-API-Test.postman_environment.json

newman run Open-Music-API-V1-Test.postman_collection.json --folder 'Add Song with Invalid Payload' --environment OpenMusic-API-Test.postman_environment.json

menjalankan kriteria 1 dan 2
newman run Open-Music-API-V1-Test.postman_collection.json --folder 'Add Album with Invalid Payload' --folder 'Add Album with Valid Payload' --folder 'Get Detail Album with Invalid Id' --folder 'Get Detail Album with Valid Id' --folder 'Edit Album with Invalid Payload' --folder 'Edit Album with Invalid Id' --folder 'Edit Album with Valid Id' --folder 'Delete Album with Invalid Id' --folder 'Delete Album with Valid Id' --folder 'Add Song with Invalid Payload' --folder 'Add Song with Valid Payload' --folder '[No Test] Add Song with Valid Payload' --folder 'Get All Songs' --folder 'Get Detail Songs with Invalid Id' --folder 'Get Detail Songs with Valid Id' --folder 'Edit Song with Invalid Payload' --folder 'Edit Song with Invalid Id' --folder 'Edit Song with Valid Id' --folder 'Delete Song with Invalid Id' --folder 'Delete Song with Valid Id' --environment OpenMusic-API-Test.postman_environment.json

search query:
newman run Open-Music-API-V1-Test.postman_collection.json --folder 'Add Song A' --folder 'Add Song B' --folder 'Add Song C' --folder 'Add Song D' --folder 'Seach Song using Title' --folder 'Seach Song using Performer' --folder 'Seach Song using Title and Performer' --environment OpenMusic-API-Test.postman_environment.json
