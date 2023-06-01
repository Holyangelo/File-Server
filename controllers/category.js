//require
const bcryptjs = require('bcryptjs')
const { response, request } = require('express');
const User = require('../models/users');
const { generateJWT } = require('../helpers/generate-jwt');
const { googleVerify } = require('../helpers/google-verify');
//end require