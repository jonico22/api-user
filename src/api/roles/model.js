var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');

module.exports = ROLES = ['USER_ROLE', 'SUPER_ROLE','ADMIN_ROLE'];

const roleSchema = new Schema(
  {
    name:  {  type: String, required: [true, ' El nombre es requerido']},
    description: {  type: String, required: [false, ' La descripción es requerido']},
    status: { type: Boolean, required: false, default: true}
  },
  {
    versionKey: false,
  }
);

roleSchema.plugin(uniqueValidator, { message: 'Error, expected {PATH} to be unique.' });

module.exports =mongoose.model("Role", roleSchema);