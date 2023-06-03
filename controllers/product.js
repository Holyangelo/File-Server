//require
const { response, request } = require('express');
const Category = require('../models/category');
const User = require('../models/users');
const Product = require('../models/product');
const jwt = require('jsonwebtoken');
//end require

//main

//GET
const productGet = async(req = request, res = response) => {// aqui yo no tengo el app, por lo cual debo llamarlo como this.app
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
    const [total, products] = await Promise.all([// puedo crear una coleccion de promesas await para que sean un unico tiempo de carga y sea mas rapido el proceso
    //User.countDocuments({ status:true }),
    //User.find({ status:true }) // dentro del find({condicion}) podemos enviar las condiciones de busqueda
    Product.countDocuments(queries),
    Product.find(queries)
    .populate('user', 'name')
    .populate('category', 'name')
    .skip(Number(init))
    .limit(Number(limit))
    ]);
    if (total === 0 ) {
    	// statement
    	return res.status(404).json({
    		msg:'not found products'
    });
    }
    res.json({
        //total,
        //users
        //resp
        total,
        products
    });
}

const productGetId = async(req = request, res = response) => {// aqui yo no tengo el app, por lo cual debo llamarlo como this.app
    //extraemos los params de lo que enviemos en la query de la ruta
    //const query = req.query;
    //forma de hacer el get sin db
    //const { name = "no name", api_key, q, page_origin = 1, limit } = req.query;
    //Si quiero obtener los argumentos que vienen en el query del link para el request puedo hacerlo usando const { arg } = req.query
    const {limit = 10, init = 0, avail = true} = req.query;
    //extraigo el id de params
    const { id } = req.params;
    let availProduct = avail;
    //GET - todos los usuarios que se encuentran en la db
    //const categoryFind = await Category.find({ _id : id }).populate('user').exec();
    // prints "The author is Ian Fleming"
    //console.log('The author is %s', categoryFind.user._id);
    //informacion del usuario
    //const { name, email } = await User.findById(categoryFind.user._id);
    const queries = { _id : id, status:true, available: availProduct };
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
    const [total, products] = await Promise.all([// puedo crear una coleccion de promesas await para que sean un unico tiempo de carga y sea mas rapido el proceso
    //User.countDocuments({ status:true }),
    //User.find({ status:true }) // dentro del find({condicion}) podemos enviar las condiciones de busqueda
    Product.countDocuments(queries),
    Product.find(queries)
    .populate('user', 'name')
    .populate('category', 'name')
    .exec()
    ]);
    if (total === 0 ) {
    	// statement
    	return res.status(404).json({
    		msg:`not found products for Id ${ id }`
    });
    }
    res.json({
        //total,
        //users
        //resp
        total,
        products
    });
}

//GET
const productGetIdByUser = async(req = request, res = response) => {// aqui yo no tengo el app, por lo cual debo llamarlo como this.app
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
    const [total, products] = await Promise.all([// puedo crear una coleccion de promesas await para que sean un unico tiempo de carga y sea mas rapido el proceso
    //User.countDocuments({ status:true }),
    //User.find({ status:true }) // dentro del find({condicion}) podemos enviar las condiciones de busqueda
    Product.countDocuments(queries),
    Product.find(queries)
    .populate('user', 'name')
    .populate('category', 'name')
    .exec()
    ]);
    if (total === 0 ) {
    	// statement
    	return res.status(404).json({
    		msg:`not found products for this user with ID ${ id }`
    });
    }
    //const valor = Object.values(categories);
    //const { name, email } = valor[0].user;
    const { __v, ...resProduct } = products;
    res.json({
        //total,
        //users
        //resp
        total,
        resProduct
    });
}

//POST
const productCreate = async(req = request, res = response) =>{
	//creamos la variable nombre y le asignamos el valor que traemos en el body
	const { user, status, ...body }= req.body;
	//buscamos si existe la categoria
	console.log({name: body.name});
	//tener mucho cuidado con los datos en mayuscula, ya que cuando guardamos en mayus es dificil validar en minuscula si se envia asi
	let nameProduct = body.name;
	nameProduct = nameProduct.toUpperCase();//tener en cuenta que a una variable const luego no se le puede hacer un cambio o igualarla a otra variable, por eso le coloque let
	//buscamos el nombre del producto en db MAYUS
	const productDB = await Product.findOne({ name: nameProduct });
	console.log(productDB);
	//validamos si ese nombre de producto ya existe
	if (productDB) {
		// statement
		return res.status(400).json({
			msg:`this product named ${ body.name } exist in db, change the name`
		});
	}
	//validamos si la categoria existe
	const categoryDB = await Category.findOne({_id : body.category});
	if (!categoryDB) {
		// statement
		return res.status(400).json({
			msg:`this category ${ body.category } not exist in db`
		});
	}
	//creamos el objetos con los datos que vamos a guardar en la db, el usuario lo llamamos con el _id como esta en la db
	//req.uid hace referencia al id del usuario logueado, uid es el renombrado del modelo en userSchema
	const data = {
		...body,
		name: body.name.toUpperCase(),
		user: req.uid
	}
	//enviamos la data al modelo
	const product = new Product( data );

	//guardamos en la db 
	try {
		// statements
		await product.save();
		//enviamos la respuesta 
		res.status(200).json(product);
	} catch(e) {
		// statements
	/*if (e.code === 11000) {
            return res.status(401).json({ message: 'change the name of the product' });
        } else {
            throw new Error(e);
        }*/
        throw new Error(e);
	}
}

//PUT
const productPut = async(req, res = response) => {// aqui yo no tengo el app, por lo cual debo llamarlo como this.app
    //body request
    const { id } = req.params;
    const { status, user, ...data } = req.body; // extraemos el status y el user porque son elementos que no necesitamos en el body y no queremos que alguien pueda cambiarlos
    const queries = { _id: id, name: data.name };//condiciones para busqueda y filtrado
    data.name = data.name.toUpperCase(); // convertimos a mayus
    data.user = req.userAuth._id; // queremos obtener quien fue el usuario que hizo la actualizacion, puedo llamar al userAuth del JWT porque esta primero en las rutas 
    if (await Product.findOne(queries)) {// aqui estoy evaluando si el producto ya posee el nombre por el cual quiero actualizar
    	// statement
    	return res.status(400).json({
    		msg: `product name ${data.name} already exists in DB`
    	});
    }
    //actualizar registro
    const updateProduct = await Product.findByIdAndUpdate( id, data , { new : true }); // esta funcion me permite buscar un registro por el id y actualizarlo
    res.json({
        code: 200,
        message: 'You are use PUT request - Controller',
        updateProduct
    });
}

//DELETE
const productDelete = async (req = request, res = response) => {// aqui yo no tengo el app, por lo cual debo llamarlo como this.app
    const { id } = req.params;
    //borrar fisicamente de la base de datos
    //const user = await User.findByIdAndDelete(id);
    //{new:true} me sirve para mostrar los cambios en la respuesta del json
    const deleteProduct = await Product.findByIdAndUpdate(id, { status:false }, { new: true}); // puedo colocar el campo a actualizar en el mismo findByIdAndUpdate
    res.json({
        code: 200,
        message: 'You are use DELETE request - Controller',
        deleteProduct
    });
}
//exports
module.exports = {
	productGet,
	productGetId,
	productGetIdByUser,
	productCreate,
	productPut,
	productDelete
}