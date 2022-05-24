const User = require('./model')
const Role = require('../roles/model')

const userProps = 'username email phone password address img roles status'
const bcrypt = require("bcrypt");
const getAll = async () => await User.find({}, userProps).populate(
  "roles"
);
const getOne = async id => await User.findById(id, userProps).populate(
  "roles"
);

const save = async (body) =>{
    const rolesFound = await Role.find({ name: { $in: body.roles } });
   
    const user = new User({
      username: body.name,
      email: body.email,
      password: bcrypt.hashSync(body.password, 10),
      roles: rolesFound.map((role) => role._id)
    })
    await user.save()
    return user
}

const signUp = async (body) =>{
  const user = new User({
    name: body.name,
    email: body.email,
    password: bcrypt.hashSync(body.password, 10)
  })

  // checking for roles
  if (req.body.roles) {
    const foundRoles = await Role.find({ name: { $in: roles } });
    user.roles = foundRoles.map((role) => role._id);
  } else {
    const role = await Role.findOne({ name: "user" });
    user.roles = [role._id];
  }
  await user.save()
  return user
}

module.exports = {
    getAll,
    getOne,
    save
}