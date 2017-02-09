var fetch = require('node-fetch');

fetch('https://api.github.com/search/repositories?q=angular&sort=stars&order=desc')
    .then(response => response.json())
    .then(data => {
        console.log(data);
    });