
function randoms() {
    const number = Math.floor(Math.random() * 100);
    return number;
}

process.on('message', (data) => {
    const {number} = data;
    let numbers = [];
    for (let i = 0; i < number; i++) {
        numbers.push(randoms());
    }
    
    let count = {};
    for (let i = 0; i < numbers.length; i++) {
        count[numbers[i]] = (count[numbers[i]] || 0) + 1;
    }
    
    process.send(count);
});