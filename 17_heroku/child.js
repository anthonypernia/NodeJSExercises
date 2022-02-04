
function randoms() {
    const number = Math.floor(Math.random() * 100);
    return number;
}

process.on('message', (data) => {
    const {number} = data;
    const count = {};
    for (let i = 0; i < number; i++) {
        const random = random();
        count[random] = (count[random] || 0) + 1;
    }

    process.send(count);
});