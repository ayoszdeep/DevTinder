const User = require("../models/user");

const findById = (id) => User.findById(id);
const findOne = (query) => User.findOne(query);
const createUser = (data) => new User(data);
const saveUser = (user) => user.save();
const findUsers = (query, projection) => User.find(query, projection);

const deleteUser = (id) => User.findByIdAndDelete(id);

module.exports = { findById, findOne, createUser, saveUser, findUsers, deleteUser };
