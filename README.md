testing: pastikan kedua file ini ada

- Open-Music-API-V1-Test.postman_collection.json
- OpenMusic-API-Test.postman_environment.json

npm install newman --g

newman run Open-Music-API-V2-Test.postman_collection.json --environment Open-Music-API-Test.postman_environment.json

users:
newman run Open-Music-API-V2-Test.postman_collection.json --folder "Add User with Invalid Payload" --folder "Add User with Valid Payload" --folder "Add User with Already Taken Username" --environment Open-Music-API-Test.postman_environment.json

authentications:
