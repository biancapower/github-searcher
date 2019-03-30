require('dotenv').config()
const fetch = require('node-fetch');
const btoa = require('btoa');
global.Headers = fetch.Headers;

// max per_page=100, to loop through pages use &page=${i}
let url = 'https://api.github.com/search/code?q=setExpandEntityReferences+in:file+language:java+sort:interactions&per_page=3';

let username = process.env.GITHUB_USERNAME;
let password = process.env.GITHUB_PASSWORD;

let authString = `${username}:${password}`
let headers = new Headers();
headers.set('Authorization', 'Basic ' + btoa(authString))

fetch(url, { headers: headers }).then(function (response) {
    return response.json();
}).then(function (data) {
    console.log(data);
}).catch(function () {
    console.log("Err");
});
