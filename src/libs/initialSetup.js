
const Role = require('../api/roles/model');
const User = require('../api/users/model');

const bcrypt = require("bcrypt");

const createRoles = async () => {
  try {
    // Count Documents
    const count = await Role.countDocuments();
    // check for existing roles
    if (count > 0) return;
    // Create default Roles
    const values = await Promise.all([
      new Role({ name: "USER_ROLE" }).save(),
      new Role({ name: "SUPER_ROLE" }).save(),
      new Role({ name: "ADMIN_ROLE" }).save(),
    ]);

    console.log(values);
  } catch (error) {
    console.error(error);
  }
};

const  createAdmin = async () => {
  // check for an existing admin user
  //const user = await User.findOne({ email: "admin@gmail.com" });
  // get roles _id
  const roles = await Role.find({ name: { $in: ["SUPER_ROLE"] } });
  console.log(roles);
 // if (!user) {
    // create a new admin user
    await User.create({
      username: "admin",
      email: "admin@gmail.com",
      password: await bcrypt.hash("admin", 10),
      roles: roles.map((role) => role._id),
    });
    console.log('Admin User Created!')
  //}
};

module.exports ={ 
  createRoles, 
  createAdmin
}
