# Github Searcher

## Setup

* Install `node` and `npm`

* Clone this repo: 
    ```
    git clone git@github.com:biancapower/github-searcher.git
    ```

* `cd github-searcher`

* `npm install`

* Create a file named `.env` and add your GitHub credentials to it
    ```
    GITHUB_USERNAME = yourusername
    GITHUB_PASSWORD = yourpassword
    ```

* Add a bash script to the `custom-script.sh` file. For example:
    ```

    ```

* Edit the values in the `searchParams` file as required

* Run `node app.js`

## FIXMEs

* GitHub API restrictions are causing the following limitations:
    - errors out after approx 8-10 pages due to API rate limiting
        * **current workaround**: manually paginate by changing starting `pageNumber` in `getResults.js` for loop, not exceeding 34 (see below)
        * **suggested fix**: stagger `getResults.js` with `app.js` to result in a time interval added between batches of API calls
    - can only retrieve first 1000 results (34 pages)
        * **suggested fix**: order results (by stars or forks) rather than just filtering, so 'best' results are retrieved
