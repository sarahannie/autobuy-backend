const mongoose = require('mongoose')


const carSchema = new mongoose.Schema({
    name:{
        type: String,
    },
    model:{
        type: String,
    },
    productionYear:{
        type : Number
    }
})


const Cars = mongoose.model('Cars', carSchema)
module.exports = Cars