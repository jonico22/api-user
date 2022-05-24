const create = require("./userCases/createUser")
const get = require("./userCases/getUsers")
const update = require("./userCases/updateUser")
const Delete = require("./userCases/deleteUser")
const login = require("./userCases/loginUser")


module.exports = {
    create,
    get,
    update,
    Delete,
    login
}