//require
const { v4: uuidv4 } = require('uuid');
const path = require('path'); // importamos el path para crear el url, esto es propio de node
//end require




//main
//uploadFiles
const uploadFiles = (files, allowedExtensions = ['jpg', 'png', 'jpeg', 'gif'], folder = '') =>{
	return new Promise((resolve, reject) =>{
	//console.log('req.files >>>', req.files); // eslint-disable-line
	//en el req viene la peticion y el archivo a cargar
		const { file } = files;
		//split me sirve para cortar el nombre del archivo
		const cutFile = file.name.split('.');
		//extraer la extension
		const extension = cutFile[ cutFile.length - 1 ];
		console.log(cutFile, extension);
		//validamos la extension
		//const allowedExtensions = ['jpg', 'png', 'jpeg', 'gif'];
		if (!allowedExtensions.includes(extension)) {
			return reject(`Invalid file extension, file extensions allowed are [${ allowedExtensions }]`);
			/*res.status(400).json({
				msg: `Invalid file extension, file extensions allowed are [${ allowedExtensions }]`
			});*/
		}
		//crear el nombre temporal con uuid en caso de que quiera un nombre unico
		const tempName = uuidv4() + '.' + extension;
		//path.join me permite crear el url path.join(direccion del servidor, direccion de la carpeta de subida, carpeta a crear de categorias, nombre del archivo)
		uploadPath = path.join(__dirname , '../uploads/', folder, tempName);
		//mv me sirve para mover el archivo a la url
		file.mv(uploadPath, function(err) {
			if (err) {
				console.log(err);
				reject(err);
				//return res.status(500).send(err);
			}
			//res
			resolve(tempName);
			//res.json({ msg: 'File uploaded to ' + uploadPath });
		});
	});
}



//module exports 
module.exports = {
	uploadFiles
}