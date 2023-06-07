//require
const { response, request } = require('express');
const { uploadFiles } = require('../helpers');
const fs = require('fs');
const path = require('path'); // importamos el path para crear el url, esto es propio de node
const { User, Product, Category } = require('../models');
//end require

//Upload File
const uploadFile = async(req, res = response) =>{
  //validamos si hay archivos para cargar
  /*if (!req.files || Object.keys(req.files).length === 0 || !req.files.file) {
    res.status(400).send('No files were uploaded.');
    return;
  }*/
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

//GET IMAGE

const getImage = async (req, res) => {
  //extramos los datos que necesitaremos para actualizar
  const { id, collection, file } = req.params;
  //establecemos una variable con un valor condicional
  let model; 
  //switch
  switch (collection) {
    //users
    case 'users':
      // statements_1
      model = await User.findById(id);
      if (!model) {
        // statement
        return res.status(401).json({
          msg:`the id  ${id} not exists `
        })
      }
      break;
      //products
      case 'products':
      // statements_1
      model = await Product.findById(id);
      if (!model) {
        // statement
        return res.status(401).json({
          msg:`the id  ${id} not exists `
        })
      }
      break;
      //categories
      case 'categories':
      // statements_1
      model = await Category.findById(id);
      if (!model) {
        // statement
        return res.status(401).json({
          msg:`the id  ${id} not exists `
        })
      }
      break;
    default:
      // statements_def
      res.status(500).json({
        msg:'this is not validate'
      });
      break;
  }
  //limpiar imagenes previas
  try {
    // statements
    if (model.img) {// si la propiedad img del producto o usuario existe
      // statement
      //removemos la imagen previa
      //path join (direccion del servidor, carpeta destino, nombre de la coleccion, nombre de la imagen)
      const imagePath = path.join( __dirname, '../uploads', collection, model.img );
      if (fs.existsSync(imagePath)){// existsSync verifica si el archivo existe en la ruta que le estoy pasando
        return res.sendFile(imagePath);
      }
    }else{
      //path join (direccion del servidor, carpeta destino, nombre de la coleccion, nombre de la imagen)
      const imagePath = path.join( __dirname, '../assets', 'default-image', 'no-image.jpg' );
      return res.sendFile(imagePath);
    }
    /*res.status(200).json({
      msg:'placeholder not found'
    });*/
  } catch(e) {
    // statements
    console.log(e);
  }
}

//Update Img
const updateImage = async (req, res = response) => {
  //extramos los datos que necesitaremos para actualizar
  const { id, collection, file } = req.params;
  //establecemos una variable con un valor condicional
  let model; 
  //switch
  switch (collection) {
    //users
    case 'users':
      // statements_1
      model = await User.findById(id);
      if (!model) {
        // statement
        return res.status(401).json({
          msg:`the id  ${id} not exists `
        })
      }
      break;
      //products
      case 'products':
      // statements_1
      model = await Product.findById(id);
      if (!model) {
        // statement
        return res.status(401).json({
          msg:`the id  ${id} not exists `
        })
      }
      break;
      //categories
      case 'categories':
      // statements_1
        console.log(id);
      model = await Category.findById(id);
      if (!model) {
        // statement
        return res.status(401).json({
          msg:`the id  ${id} not exists `
        })
      }
      break;
    default:
      // statements_def
      res.status(500).json({
        msg:'this is not validate'
      });
      break;
  }
  //limpiar imagenes previas
  try {
    // statements
    if (model.img) {// si la propiedad img del producto o usuario existe
      // statement
      //removemos la imagen previa
      //path join (direccion del servidor, carpeta destino, nombre de la coleccion, nombre de la imagen)
      const imagePath = path.join( __dirname, '../uploads', collection, model.img );
      if (fs.existsSync(imagePath)){// existsSync verifica si el archivo existe en la ruta que le estoy pasando
        fs.unlinkSync(imagePath);// unlinkSync borra el archivo
      }
    }
    const nameFile = await uploadFiles(req.files, undefined, collection);// coloco collection para forzar a crear una carpeta con el nombre de la coleccion
    model.img = nameFile;
    //guardamos o actualizamos
    await model.save();
    res.status(200).json({
      id,
      collection,
      model
    });
  } catch(e) {
    // statements
    console.log(e);
  }
}

module.exports = {
	uploadFile,
  updateImage,
  getImage
}