let json = require('./results.json');       // TODO: use github api directly
const execSync = require('child_process').execSync;

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

    // cd into folder, run script to check for desired results, append names of files to files.txt, cd out of folder (sed adds formatting)
    cmd += ` && cd ${name} && ./../../vuln-script.sh | sed 's/^/--- /' >> ./../../files.txt && cd ./../../`;

    // remove repo      FIXME: only do this if doesn't contain desired results
    // cmd += `&& rm -rf ${name}`;

    const output = execSync(cmd, { encoding: 'utf-8' });
}


