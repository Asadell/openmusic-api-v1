testing: pastikan kedua file ini ada

- Open-Music-API-V3-Test.postman_collection.json
- Open-Music-API-Test-V3.postman_environment.json

npm install newman --g

newman run Open-Music-API-V3-Test.postman_collection.json --environment Open-Music-API-Test-V3.postman_environment.json
