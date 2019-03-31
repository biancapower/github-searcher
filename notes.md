``` js
/* from: https://stackoverflow.com/questions/1880198/how-to-execute-shell-command-in-javascript */
const execSync = require('child_process').execSync;
// import { execSync } from 'child_process';  // replace ^ if using ES modules
const output = execSync('ls', { encoding: 'utf-8' });  // the default is 'buffer'
console.log('Output was:\n', output);

```

```
curl -u biancapower "https://api.github.com/search/code?q=setExpandEntityReferences+in:file+language:java+sort:interactions&per_page=3"
```

`vuln-script.sh` must end with "true"

`https://github.com/SBoudrias/Inquirer.js` for user input / options