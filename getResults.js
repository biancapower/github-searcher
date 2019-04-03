const {searchString, codeLanguage, pageNumber, perPage, minStars, minForks} = require('./searchParams');
require('dotenv').config()
const fetch = require('node-fetch');
const btoa = require('btoa');
global.Headers = fetch.Headers;

// max per_page=100, to loop through pages use &page=${i}
let url = `https://api.github.com/search/code?q=${searchString}+in:file+language:${codeLanguage}&page=${pageNumber}&per_page=${perPage}`;

let username = process.env.GITHUB_USERNAME;
let password = process.env.GITHUB_PASSWORD;

let authString = `${username}:${password}`
let headers = new Headers();
headers.set('Authorization', 'Basic ' + btoa(authString))

module.exports = fetch(url, { headers: headers }).then(async function (response) {
    codeRes = await response.json();

    let endResults = [];

    for (let i = 0; i < codeRes.items.length; i++) {
        let repoFullName = codeRes.items[i].repository.full_name
    
        let repoUrl = `https://api.github.com/repos/${repoFullName}`;

        res = await fetch(repoUrl, { headers: headers });
        repoRes = await res.json(); 

        let stars = repoRes.watchers;
        let forks = repoRes.forks;

        if (stars >= minStars || forks >= minForks) {
            console.log("stars:", stars, "| forks:", forks, repoFullName);
            endResults.push(codeRes.items[i]);
        }
    }

    return endResults;
});
