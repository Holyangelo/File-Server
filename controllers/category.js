//require
const { response, request } = require('express');
const Category = require('../models/category');
const User = require('../models/users');
//end require

//main

//creamos los controladores para cada una de las rutas
//GET
const categoryGet = async(req = request, res = response) => {// aqui yo no tengo el app, por lo cual debo llamarlo como this.app
    //extraemos los params de lo que enviemos en la query de la ruta
    //const query = req.query;
    //forma de hacer el get sin db
    //const { name = "no name", api_key, q, page_origin = 1, limit } = req.query;
    //Si quiero obtener los argumentos que vienen en el query del link para el request puedo hacerlo usando const { arg } = req.query
    const { limit = 4, init = 0} = req.query;
    //GET - todos los usuarios que se encuentran en la db
    const queries = { status:true };
    /*const users = await User.find({ status:true }) // dentro del find({condicion}) podemos enviar las condiciones de busqueda
    .skip(Number(init))
    .limit(Number(limit));*/
    /*res.json({
        code: 200,
        message: 'You are use GET request - Controller',
        name,
        api_key,
        q,
        page_origin,
        limit
    });*/
    /*const total = await User.countDocuments({ status:true });*/// dentro del countDocuments({condicion}) podemos enviar las condiciones de busqueda
    //podemos realizar una desestructuracion de arreglos para darle nombre a las promesas segun su posicion
    const [total, categories] = await Promise.all([// puedo crear una coleccion de promesas await para que sean un unico tiempo de carga y sea mas rapido el proceso
    //User.countDocuments({ status:true }),
    //User.find({ status:true }) // dentro del find({condicion}) podemos enviar las condiciones de busqueda
    Category.countDocuments(queries),
    Category.find(queries)
    .populate('user', 'name')
    .skip(Number(init))
    .limit(Number(limit))
    ]);
    if (total === 0 ) {
    	// statement
    	return res.status(404).json({
    		msg:'not found categories'
    });
    }
    res.json({
        //total,
        //users
        //resp
        total,
        categories
    });
}

const categoryGetId = async(req = request, res = response) => {// aqui yo no tengo el app, por lo cual debo llamarlo como this.app
    //extraemos los params de lo que enviemos en la query de la ruta
    //const query = req.query;
    //forma de hacer el get sin db
    //const { name = "no name", api_key, q, page_origin = 1, limit } = req.query;
    //Si quiero obtener los argumentos que vienen en el query del link para el request puedo hacerlo usando const { arg } = req.query
    const {limit = 10, init = 0} = req.query;
    //extraigo el id de params
    const { id } = req.params;
    //GET - todos los usuarios que se encuentran en la db
    //const categoryFind = await Category.find({ _id : id }).populate('user').exec();
    // prints "The author is Ian Fleming"
    //console.log('The author is %s', categoryFind.user._id);
    //informacion del usuario
    //const { name, email } = await User.findById(categoryFind.user._id);
    const queries = { _id : id, status:true };
    /*const users = await User.find({ status:true }) // dentro del find({condicion}) podemos enviar las condiciones de busqueda
    .skip(Number(init))
    .limit(Number(limit));*/
    /*res.json({
        code: 200,
        message: 'You are use GET request - Controller',
        name,
        api_key,
        q,
        page_origin,
        limit
    });*/
    /*const total = await User.countDocuments({ status:true });*/// dentro del countDocuments({condicion}) podemos enviar las condiciones de busqueda
    //podemos realizar una desestructuracion de arreglos para darle nombre a las promesas segun su posicion
    const [total, categories] = await Promise.all([// puedo crear una coleccion de promesas await para que sean un unico tiempo de carga y sea mas rapido el proceso
    //User.countDocuments({ status:true }),
    //User.find({ status:true }) // dentro del find({condicion}) podemos enviar las condiciones de busqueda
    Category.countDocuments(queries),
    Category.find(queries)
    .populate('user', 'name')
    .exec()
    ]);
    if (total === 0 ) {
    	// statement
    	return res.status(404).json({
    		msg:`not found categories for Id ${ queries }`
    });
    }
    res.json({
        //total,
        //users
        //resp
        total,
        categories
    });
}

//GET
const categoryGetIdByUser = async(req = request, res = response) => {// aqui yo no tengo el app, por lo cual debo llamarlo como this.app
    //extraemos los params de lo que enviemos en la query de la ruta
    //const query = req.query;
    //forma de hacer el get sin db
    //const { name = "no name", api_key, q, page_origin = 1, limit } = req.query;
    //Si quiero obtener los argumentos que vienen en el query del link para el request puedo hacerlo usando const { arg } = req.query
    const {limit = 10, init = 0} = req.query;
    //extraigo el id de params
    const { id } = req.params;
    //GET - todos los usuarios que se encuentran en la db
    //const categoryFind = await Category.find({ _id : id }).populate('user').exec();
    // prints "The author is Ian Fleming"
    //console.log('The author is %s', categoryFind.user._id);
    //informacion del usuario
    //const { name, email } = await User.findById(categoryFind.user._id);
    const queries = { user : id, status:true };
    /*const users = await User.find({ status:true }) // dentro del find({condicion}) podemos enviar las condiciones de busqueda
    .skip(Number(init))
    .limit(Number(limit));*/
    /*res.json({
        code: 200,
        message: 'You are use GET request - Controller',
        name,
        api_key,
        q,
        page_origin,
        limit
    });*/
    /*const total = await User.countDocuments({ status:true });*/// dentro del countDocuments({condicion}) podemos enviar las condiciones de busqueda
    //podemos realizar una desestructuracion de arreglos para darle nombre a las promesas segun su posicion
    const [total, categories] = await Promise.all([// puedo crear una coleccion de promesas await para que sean un unico tiempo de carga y sea mas rapido el proceso
    //User.countDocuments({ status:true }),
    //User.find({ status:true }) // dentro del find({condicion}) podemos enviar las condiciones de busqueda
    Category.countDocuments(queries),
    Category.find(queries)
    .populate('user', 'name')
    .exec()
    ]);
    if (total === 0 ) {
    	// statement
    	return res.status(404).json({
    		msg:'not found categories for this user'
    });
    }
    //const valor = Object.values(categories);
    //const { name, email } = valor[0].user;
    const { __v, ...resCategory } = categories;
    res.json({
        //total,
        //users
        //resp
        total,
       resCategory
    });
}

//POST
const categoryCreate = async(req = request, res = response) =>{
	//creamos la variable nombre y le asignamos el valor que traemos en el body
	const name = req.body.name.toUpperCase();
	//buscamos si existe la categoria
	const categoryDB = await Category.findOne({ name });

	if (categoryDB) {
		// statement
		res.status(400).json({
			msg:`this category ${ categoryDB.name } exist in db`
		});
	}
	//creamos el objetos con los datos que vamos a guardar en la db, el usuario lo llamamos con el _id como esta en la db
	const data = {
		name,
		user: req.uid
	}
	//enviamos la data al modelo
	const category = new Category( data );

	//guardamos en la db 
	try {
		// statements
		await category.save();
		//enviamos la respuesta 
		res.status(200).json(category);
	} catch(e) {
		// statements
		console.log(e);
	}
}

//PUT
const categoryPut = async(req, res = response) => {// aqui yo no tengo el app, por lo cual debo llamarlo como this.app
    //body request
    const { id } = req.params;
    const { name } = req.body;
    if (await Category.findOne({ _id: id, name: name })) {// aqui estoy evaluando si la categoria ya posee el nombre por el cual quiero actualizar
    	// statement
    	return res.status(400).json({
    		msg: `category name ${name} already exists in DB`
    	});
    }
    //actualizar registro
    const updateCategory = await Category.findByIdAndUpdate( id, { name : name }); // esta funcion me permite buscar un registro por el id y actualizarlo
    res.json({
        code: 200,
        message: 'You are use PUT request - Controller',
        updateCategory
    });
}

//exports
module.exports = {
	categoryCreate,
	categoryGet, 
	categoryGetId,
	categoryGetIdByUser,
	categoryPut
}