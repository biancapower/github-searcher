``` js
/* from: https://stackoverflow.com/questions/1880198/how-to-execute-shell-command-in-javascript */
const execSync = require('child_process').execSync;
// import { execSync } from 'child_process';  // replace ^ if using ES modules
const output = execSync('ls', { encoding: 'utf-8' });  // the default is 'buffer'
console.log('Output was:\n', output);

```