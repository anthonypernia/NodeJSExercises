// let parseArgs = require('minimist');

// const options = {  default: { port: 3000, host: 'localhost' }, alias: { p: 'port', h: 'host' } };

// console.log(parseArgs(process.argv.slice(2), options));
// // process.argv.forEach((e, i) => {
// //     console.log(`${i}: ${e}`);
// // });

const yargs = require('yargs')(process.argv.slice(2));
const argv = yargs
.default({
    port: 3000,
})
.alias({
    p: 'port',
    m: 'mode',
    d: 'debug',
})
.argv;


console.log(argv);