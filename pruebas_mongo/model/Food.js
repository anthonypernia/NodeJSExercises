const database = require('monk')('192.168.0.16/after')

let food = database.get('food')

module.exports = {
    find: () => {
        return food.find();
    },

    create:(food) => {
        return food.insert({
            food
        })
    }
}