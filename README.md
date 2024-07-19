testing: pastikan kedua file ini ada

- Open-Music-API-V1-Test.postman_collection.json
- OpenMusic-API-Test.postman_environment.json

npm install newman --g

newman run Open-Music-API-V1-Test.postman_collection.json --environment OpenMusic-API-Test.postman_environment.json
atau
newman run Open-Music-API-V1-Test.postman_collection.json --folder 'Add Album with Valid Payload' --folder 'Get Detail Album with Valid Id' --folder 'Edit Album with Valid Id' --folder 'Delete Album with Valid Id' --environment OpenMusic-API-Test.postman_environment.json
