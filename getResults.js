require('dotenv').config()
const fetch = require('node-fetch');
const btoa = require('btoa');
global.Headers = fetch.Headers;

const searchString = "setExpandEntityReferences";
const codeLanguage = "java";
const sortBy = "interactions";
const pageNumber = 1;
const perPage = 50;

// max per_page=100, to loop through pages use &page=${i}
let url = `https://api.github.com/search/code?q=${searchString}+in:file+language:${codeLanguage}+sort:${sortBy}&page=${pageNumber}&per_page=${perPage}`;

let username = process.env.GITHUB_USERNAME;
let password = process.env.GITHUB_PASSWORD;

let authString = `${username}:${password}`
let headers = new Headers();
headers.set('Authorization', 'Basic ' + btoa(authString))

module.exports=fetch(url, { headers: headers }).then(function (response) {
    return response.json();
});
