//require
const validateFields = require('../middleware/validate-field');
const validateJWT = require('../middleware/validate-jwt');
const validateRole = require('../middleware/validate-role');
//end require

//exports
module.exports = {
	...validateFields,
	...validateJWT,
	...validateRole
}