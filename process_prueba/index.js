//-----Minimist
// let parseArgs = require('minimist');

// const options = {  default: { port: 3000, host: 'localhost' }, alias: { p: 'port', h: 'host' } };

// console.log(parseArgs(process.argv.slice(2), options));
// // process.argv.forEach((e, i) => {
// //     console.log(`${i}: ${e}`);
// // });


// ///-------yargs
// const yargs = require('yargs')(process.argv.slice(2));
// const argv = yargs
// .default({
//     port: 3000,
// })
// .alias({
//     p: 'port',
//     m: 'mode',
//     d: 'debug',
// })
// .argv;


// console.log(argv);

// process.on('uncaughtException', (err) => {
//     console.log('uncaughtException: ', err);
// }
// );

/// child process

const {exec} = require('child_process');
const {execFile} = require('child_process');
const {spawn} = require('child_process');
const {fork} = require('child_process');

// /// using exec
// exec('ls -la', (err, stdout, stderr) => {
//     if (err) {
//         console.log('err: ', err);
//     }
//     console.log('stdout: ', stdout);
//     console.log('stderr: ', stderr);
// }
// );

// //using execfile
// execFile('node', ['indexprueba.js'], (err, stdout, stderr) => {
//     if (err) {
//         console.log('err: ', err);
//     }
//     console.log('stdout: ', stdout);
//     console.log('stderr: ', stderr);
// }
// );

////using spawn
// let child = spawn('find', ['.', '-type', 'f'], {
//     stdio: 'inherit',
//     shell: true,
// }
// );

// child.stdout.on('data', (data) => {
//     console.log('data: ', data);
// }
// );

// child.stderr.on('data', (data) => {
//     console.log('data: ', data);
// }
// );

///using fork

let express = require('express');
let app = express();
let port = 8080
let visitas = 0
let child = fork('child_proccess.js');


function sum(){
    let sum = 0;
    for(let i = 0; i < 6e9; i++){
        sum += i;
    }
    return sum;
}

app.all('*', (req, res) => {
    let {url} = req;

    if (url === '/calculo-bloqueante') {
        let suma = sum();
        res.send(`<h1> el resultado es : ${suma}</h1>`);
    }else if (url === '/calculo-no-bloqueante') {
        child.send("sfgwyeewyw");
        child.on('message', (data) => {
            res.send(`<h1> el resultado es : ${data.res}</h1>`);
        });
    }else{
        res.send(`ok ---> visitas : ${visitas++}`);
    }
});

app.listen(port, () => {
    console.log(`listening on port ${port}`);
}
);
