const autocannon = require('autocannon');
const url = 'http://localhost:8080/info';
const url2 = 'http://localhost:8080/randoms/1000';
const { PassThrough } = require('stream');

function run(url){
    const buf = [];
    const outputStream = new PassThrough();

    const inst = autocannon({
        url,
        connections: 100,
        duration: 20,
    });

    autocannon.track(inst, { outputStream} );

    outputStream.on('data', (data) =>  buf.push(data));

    inst.on('done', () => {
        process.stdout.write(Buffer.concat(buf));
    });
}

console.log('Running...');

run(url);
run(url2);