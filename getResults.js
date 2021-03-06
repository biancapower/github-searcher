"use strict";

const {searchString, codeLanguage, minStars, minForks} = require('./searchParams');
require('dotenv').config()
const fetch = require('node-fetch');
const btoa = require('btoa');
global.Headers = fetch.Headers;

// results per page, max=100
const perPage = 30;

module.exports = async function() {
    
    let results = [];

    // can only get first 1000 results from GitHub API (1000 / 30 [perPage] = 33.33)
    for (let pageNumber = 1; pageNumber < 35; pageNumber++) {
        // max per_page=100, to loop through pages use &page=${i}
        let url = `https://api.github.com/search/code?q=${searchString}+in:file+language:${codeLanguage}&page=${pageNumber}&per_page=${perPage}`;

        let username = process.env.GITHUB_USERNAME;
        let password = process.env.GITHUB_PASSWORD;

        let authString = `${username}:${password}`
        let headers = new Headers();
        headers.set('Authorization', 'Basic ' + btoa(authString))

        try {
            results = results.concat(await fetch(url, { headers: headers }).then(async function (response) {
                const codeRes = await response.json();

                const repoInfoPromises = [];

                for (let i = 0; i < codeRes.items.length; i++) {
                    const searchRes = codeRes.items[i];
                    const repoFullName = codeRes.items[i].repository.full_name;
                
                    const repoUrl = `https://api.github.com/repos/${repoFullName}`;

                    const repoInfoPromise = async function() { //immediately called
                        const res = await fetch(repoUrl, { headers: headers });
                        const repoInfo = await res.json();
                        return [searchRes, repoInfo];
                    }();

                    repoInfoPromises.push(repoInfoPromise);
                }

                try {
                    const repoInfos = await Promise.all(repoInfoPromises);
                    //console.log(repoInfos);
                    const usefulRepos = repoInfos.filter(function (pair) {
                        const repoInfo = pair[1];
                        const stars = repoInfo.watchers;
                        const forks = repoInfo.forks;

                        if (stars >= minStars || forks >= minForks) {
                            console.log("stars:", stars, "| forks:", forks, repoInfo.full_name);
                            return true;
                        } else {
                            return false;
                        }

                    }).map(function(pair) { return pair[0]; });
                    return usefulRepos;
                } catch {
                    console.error("API OVERLOAD!!! v1");
                    return [];
                }
            }));
        } catch {
            console.error("API OVERLOAD!!! v2");
            break;
        }
        console.log('Page completed:', pageNumber);
    }
    return results;
}
