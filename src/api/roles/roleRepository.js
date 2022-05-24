const Role = require('./model')
const roleProps = 'name description status'

const getAll = async () => await Role.find({}, roleProps);
const getOne = async id => await Role.findById(id, roleProps);

const save = async (body) =>{
    
    const role = new Role({
      name: body.name,
    })
    await role.save()
    return role
}

module.exports = {
    getAll,
    getOne,
    save
}