const connectionRequest = require("../models/connectionRequest");

const findOne = (query) => connectionRequest.findOne(query);
const find = (query) => connectionRequest.find(query);
const createRequest = (data) => new connectionRequest(data);
const saveRequest = (request) => request.save();

const deleteMany = (query) => connectionRequest.deleteMany(query);

module.exports = { findOne, find, createRequest, saveRequest, deleteMany };
