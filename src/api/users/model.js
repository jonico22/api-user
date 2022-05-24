//Web Model
var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var Schema = mongoose.Schema;

var userSchema = new Schema({
    username: {  type: String, required: [false, ' El username es requerido']},
    email: {  type: String, unique: true,  required: [true, ' El email es requerido']},
    password: {  type: String, required: [true, ' El password es requerido']},
    phone: {  type: String, required: [false, ' El phone es requerido']},
    img: {  type: String, required: [false, ' la img es requerido']},
    address: {  type: String, required: [false, ' El address es requerido']},
    roles: [
        {
          type: Schema.Types.ObjectId,
          ref: "Role",
        },
      ],
    status: { type: Boolean, required: false, default: true}
},{ timestamps: true ,versionKey: false});

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id
      delete returnedObject._id
      delete returnedObject.__v
      delete returnedObject.password
    }
})

userSchema.plugin(uniqueValidator, { message: 'Error, expected {PATH} to be unique.' });


module.exports = mongoose.model('User', userSchema);