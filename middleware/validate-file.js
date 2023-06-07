//require
const express = require("express");
//end require

//main
const validateFile = (req, res = response, next) => {
	if (!req.files || Object.keys(req.files).length === 0 || !req.files.file) {
    res.status(400).json({
    	msg:'File not found'
    })
    return;
  }
  next();
}

//module.exports
module.exports = {
	validateFile
};