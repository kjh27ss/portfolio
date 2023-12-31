const mongoose = require('mongoose');

const { Schema } = mongoose;
const skillsSchema = new Schema({ 
    name:{
        type:String,
        required:true,
        unique:true
    },
    value:{
        type:Number,
        required:true,
        unique:50
    },
    orimg:String,
    img:String,
    createAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Skills', skillsSchema);