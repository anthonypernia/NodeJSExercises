console.log("Conectandome desde proceso hijo");


process.on('message', (data) => {
    console.log('data: ', data);
    process.send({res: sum()});

}
);

function sum(){
    let sum = 0;
    for(let i = 0; i < 6e9; i++){
        sum += i;
    }
    return sum;
}