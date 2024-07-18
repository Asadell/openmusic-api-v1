testing:

newman run Open-Music-API-V1-Test.postman_collection.json --environment OpenMusic-API-Test.postman_environment.json

"menjalankan request hanya untuk 'POST /albums'"
newman run Open-Music-API-V1-Test.postman_collection.json --folder 'Add Album with Valid Payload' --environment OpenMusic-API-Test.postman_environment.json

"menjalankan request hanya untuk 'POST /albums' n 'GET /albums/{id}'"
newman run Open-Music-API-V1-Test.postman_collection.json --folder 'Add Album with Valid Payload' --folder 'Get Detail Album with Valid Id' --environment OpenMusic-API-Test.postman_environment.json

"menjalankan request hanya untuk 'POST /albums' n 'PUT /albums/{id}'"
newman run Open-Music-API-V1-Test.postman_collection.json --folder 'Add Album with Valid Payload' --folder 'Edit Album with Valid Id' --environment OpenMusic-API-Test.postman_environment.json

"menjalankan request hanya untuk 'POST /albums' n 'DELETE /albums/{id}'"
newman run Open-Music-API-V1-Test.postman_collection.json --folder 'Add Album with Valid Payload' --folder 'Delete Album with Valid Id' --environment OpenMusic-API-Test.postman_environment.json

"menjalankan request hanya untuk 'POST /albums' n 'DELETE /albums/{id}'"
newman run Open-Music-API-V1-Test.postman_collection.json --folder 'Add Album with Valid Payload' --folder 'Get Detail Album with Valid Id' --folder 'Edit Album with Valid Id' --folder 'Delete Album with Valid Id' --environment OpenMusic-API-Test.postman_environment.json
