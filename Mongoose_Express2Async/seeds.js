const mongoose = require('mongoose');
const Product = require('./models/product');

mongoose.connect('mongodb://127.0.0.1:27017/farmStand2', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
       console.log("Mongo connected")
    })
    .catch(err => {
        console.log("Failed to connect to Mongo")
        console.log(err)
    })

// const p = new Product({
//     name: 'Ruby Grapefruit',
//     price: 1.99,
//     category: 'fruit'
// })
// p.save()
//     .then(p =>{
//         console.log(p)
//     })
//     .catch(e => {
//         console.log(e)
//     })
const seedProducts = [
    {
        name: 'Winter Carrot',
        price: 0.99,
        category: 'vegetable'
    },
    {
        name: 'Pumpkin',
        price: 4.99,
        category: 'vegetable'
    },
    {
        name: 'Whole Milk',
        price: 2.99,
        category: 'dairy'
    }
]

Product.insertMany(seedProducts)
    .then(res => {
        console.log(res)
    })
    .catch(e => {
        console.log(e)
    })
