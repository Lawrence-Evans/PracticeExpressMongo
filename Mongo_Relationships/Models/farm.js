const mongoose =require('mongoose');
const {Schema} = mongoose;

mongoose.connect('mongodb://127.0.0.1:27017/relationshipDemo', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
       console.log("Connected")
    })
    .catch(err => {
        console.log("Failed to connect")
        console.log(err)
    })

const productSchema = new Schema({
    name: String,
    price: Number,
    season: {
        type: String,
        enum: ['Spring', 'Summer', 'Autumn', 'Winter']
    }
});

const farmSchema = new Schema({
    name: String,
    city: String,
    products: [{ type: Schema.Types.ObjectId, ref: 'Product' }]
});

const Product = mongoose.model('Product', productSchema);
const Farm = mongoose.model('Farm', farmSchema);

// One time additions
// Product.insertMany([
//     {name: 'Goodens Melon', price: 4.99, season: 'Spring'},
//     {name: 'Greens Beans', price: 0.99, season: 'Autumn'},
//     {name: 'Tiny Sprouts', price: 2.49, season: 'Winter'},
// ])

// One time additions
// const makeFarm = async () => {
//     const farm = new Farm({ name: 'Fat Belly Farms', city: 'Darlington' });
//     const melon = await Product.findOne({ name: 'Goodens Melon' });
//     farm.products.push(melon)
//     await farm.save()
//     console.log(farm);
// }

// makeFarm();

const addProduct = async () => {
    const farm = await Farm.findOne({name: 'Fat Belly Farms'});
    const beans = await Product.findOne({name: 'Greens Beans'});
    farm.products.push(beans);
    await farm.save();
    console.log(farm);
}

// addProduct();

Farm.findOne({name: 'Fat Belly Farms'})
    .populate('products')
    .then(farm => console.log(farm))