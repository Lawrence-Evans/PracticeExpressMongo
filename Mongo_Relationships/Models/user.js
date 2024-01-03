const mongoose =require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/relationshipDemo', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
       console.log("Connected")
    })
    .catch(err => {
        console.log("Failed to connect")
        console.log(err)
    })

const userSchema = mongoose.Schema({
    first: String,
    last: String,
    address: [
        {
            _id: { _id: false },
            street: String,
            city: String,
            state: String,
            country: String
        }
    ]
})

const User = mongoose.model('User', userSchema);

const makeUser = async () => {
    const u = new User({
        first: 'Dean',
        last: 'Lampen'
    })
    u.address.push(
        {
        street: '64 Zoo Lane',
        city: 'Munnsfield',
        state: 'Lincolnshire',
        country: 'UK'
        }
    )
    const res = await u.save()
    console.log(res)
}

const addAddress = async (id) => {
    const user = await User.findById(id);
    user.address.push(
        {
        street: '46 Circus Lane',
        city: 'Muddsfield',
        state: 'Lincolnshire',
        country: 'UK'
        }
    )
    const res = await user.save()
    console.log(res);
}

addAddress('6572068b1893d13027f13f13')