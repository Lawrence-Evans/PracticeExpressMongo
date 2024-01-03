const mongoose = require('mongoose');
const Product = require('./product');
const {Schema} = mongoose

const farmSchema = new Schema({
    name: {
        type: String,
        required: [true, 'name cannot be blank']
    },
    city: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: [true, 'email required']
    },
    products:  [
        {
            type: Schema.Types.ObjectId,
            ref: 'Product'
        }
    ]
})

farmSchema.post('findOneAndDelete', async function(farm) {
    if (farm.products.length) {
        const res = await Product.deleteMany({_id: { $in: farm.products } })
        console.log(res);
    }
})


const Farm = mongoose.model('Farm', farmSchema);

module.exports = Farm;