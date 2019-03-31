const githubApiCall = require('./getResults');
const execSync = require('child_process').execSync;

githubApiCall
.then(function (json) {

    let items = json.items;

    for (let i = 0; i < items.length; i++) {
        let name = items[i].repository.name;
        let fullName = items[i].repository.full_name;
        let cloneLink = `git@github.com:${fullName}.git`;
        let htmlLink = items[i].repository.html_url;

        // cd into clones folder and clone repo     FIXME: create clones folder if doesn't exist
        let cmd = `cd ./clones && git clone ${cloneLink}`;

        // add repo name and link to files.txt
        cmd += ` && echo '\n============\n' ${name.toUpperCase()}    '('${htmlLink}')' '\n============' >> ./../files.txt`

        // cd into folder && run script to check for desired results (sed adds formatting), appending names of files to files.txt; then if results cd out of folder, else if no results rm directory
        cmd += ` && cd ${name} && if [[ $(./../../vuln-script.sh | sed 's/^/--- /' | tee -a ./../../files.txt) ]]; then cd ./../../; else cd ./../../ && rm -rf ./clones/${name}; fi`;

        const output = execSync(cmd, { encoding: 'utf-8' });
    }
    
}).catch(function () {
    console.error("Err");
});

