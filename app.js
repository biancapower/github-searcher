let json = require('./results.json');
const execSync = require('child_process').execSync;

let items = json.items;

for (let i = 0; i < items.length; i++) {
    let name = items[i].repository.name;
    let fullName = items[i].repository.full_name;
    let cloneLink = `git@github.com:${fullName}.git`;

    // cd into clones folder and clone repo
    let cmd = `cd ./clones && git clone ${cloneLink}`;

    // add name of repo to files.txt
    cmd += ` && echo ${name} >> ./../files.txt`

    // cd into folder, run script to check for desired results, append names of files to files.txt, cd out of folder
    cmd += ` && cd ${name} && ./../../vuln-script.sh >> ./../../files.txt && cd ./../../`;

    // remove repo      FIXME: only do this if doesn't contain desired results
    // cmd += `&& rm -rf ${name}`;

    const output = execSync(cmd, { encoding: 'utf-8' });
}


