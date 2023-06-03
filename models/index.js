//require
const server = require('./server');
const category = require('./category');
const users = require('./users');
const roles = require('./roles');
const product = require('./product');
//end require

//exports
module.exports = {
	server,
	category,
	user,
	roles,
	product
}