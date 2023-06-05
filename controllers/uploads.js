//require
const { response, request } = require('express');
const { uploadFiles } = require('../helpers')
//end require

const uploadFile = async(req, res = response) =>{
  //validamos si hay archivos para cargar
  if (!req.files || Object.keys(req.files).length === 0 || !req.files.file) {
    res.status(400).send('No files were uploaded.');
    return;
  }
  //try-catch
  try {
  // statements
  //creamos el path, ya tengo el archivo en req.files
  //name = await uploadFiles(req.files, ['txt', 'md'], 'info');
  //si necesito las allowedExtensions por defecto envio undefined
  name = await uploadFiles(req.files, undefined, 'imgs');
  //filePath = await uploadFiles(req.files);
  //mensaje de respuesta
  res.status(200).json({ name });
  } catch(msg) { // capturamos el msg error del helper
    // statements
    console.log(msg);
    res.status(400).json({msg});
  }
}

module.exports = {
	uploadFile
}