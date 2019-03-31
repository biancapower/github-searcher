const githubApiCall = require('./getResults');
const execSync = require('child_process').execSync;

githubApiCall
.then(function (json) {

    let items = json.items;

    for (let i = 0; i < items.length; i++) {
        let name = items[i].repository.name;
        let fullName = items[i].repository.full_name;
        let repoOwner = items[i].repository.owner.login;
        let cloneLink = `git@github.com:${fullName}.git`;
        let htmlLink = items[i].repository.html_url;
        let description = items[i].repository.description;
        let descriptionString;

        if (description != null) {
            descriptionString = JSON.stringify(description);
        } else {
            descriptionString = "No description";
        }

        // cd into clones folder and clone repo     FIXME: create clones folder if doesn't exist
        let cmd = `cd ./clones && git clone ${cloneLink}`;

        // add repo name, link, and description to files.txt
        cmd += ` && echo '\n==============================\n ${name.toUpperCase()}  (${htmlLink}) \n ${descriptionString} \n==============================' >> ./../files.txt`

        // cd into folder && run script to check for desired results (sed adds formatting), appending names of files to files.txt; then if results cd out of folder and rename it (eliminate conflicts with other repos of same name), else if no results rm directory
        cmd += ` && cd ${name} && if [[ $(./../../custom-script.sh | sed 's/^/--- /' | tee -a ./../../files.txt) ]]; then cd ./../../ && mv ./clones/${name} ./clones/${name}__${repoOwner.toLowerCase()}; else cd ./../../ && rm -rf ./clones/${name}; fi`;

        const output = execSync(cmd, { encoding: 'utf-8', shell: '/bin/bash' });
    }
    
}).catch(function () {
    console.error("Err");
});

