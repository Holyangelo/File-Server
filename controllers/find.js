//require
const { response, request } = require('express');
const { ObjectId } = require('mongoose').Types; // se usa para validar si el ObjectId es valido de mongo
const Category = require('../models/category');
const User = require('../models/users');
const Product = require('../models/product');
//end require

//allow collections - este es un modo de restriccion que aplico sobre la peticion, estas son las colecciones sobre las que esta permitida hacer busqueda
const allowedCollections = [
	'users',
	'roles',
	'categories',
	'products'
	];

//main

//find user
const findUser = async(terms = '', res = response) =>{
	const isMongoId = ObjectId.isValid(terms); // valido si el termino es un id de mongo
	if (isMongoId) { // si es un id valido
		// statement
		const user = await User.findById(terms);
		return res.json({
			results: ( user ) ? [user] : []
		});
	}
		try {
		// statements
		//si queremos buscar todos los usuarios que tengan parametros similares al termino de busqueda, requerimos una expresion regular
		const regex = new RegExp(terms, 'i'); // RexExp(termino de busqueda, opcion :  i = insensible a minus o mayus)
		//buscamos por nombre
		//$or es una propiedad de mongo que nos permite establecer una condicion
		const users = await User.find({
			$or: [{ name: regex }, { email: regex }],
			$and: [{ status: true }]
		});
		res.status(201).json({
			results: users
		})
		} catch(e) {
			// statements
			console.log(e);
		}
}

//find user
const findCategories = async(terms = '', res = response) =>{
	const isMongoId = ObjectId.isValid(terms); // valido si el termino es un id de mongo
	if (isMongoId) { // si es un id valido
		// statement
		const category = await Category.findById(terms);
		return res.json({
			results: ( category ) ? [category] : []
		});
	}
		try {
		// statements
		//si queremos buscar todos los usuarios que tengan parametros similares al termino de busqueda, requerimos una expresion regular
		const regex = new RegExp(terms, 'i'); // RexExp(termino de busqueda, opcion :  i = insensible a minus o mayus)
		//buscamos por nombre
		//$or es una propiedad de mongo que nos permite establecer una condicion
		const categories = await Category.find({
			$or: [{ name: regex }],
			$and: [{ status: true }]
		});
		res.status(201).json({
			results: categories
		})
		} catch(e) {
			// statements
			console.log(e);
		}
}

//find user
const findProducts = async(terms = '', res = response) =>{
	const isMongoId = ObjectId.isValid(terms); // valido si el termino es un id de mongo
	if (isMongoId) { // si es un id valido
		// statement
		const product = await Product.findById(terms)
		.populate('category', 'name')
		.populate('user', 'name');
		return res.json({
			results: ( product ) ? [product] : []
		});
	}
		try {
		// statements
		//si queremos buscar todos los usuarios que tengan parametros similares al termino de busqueda, requerimos una expresion regular
		const regex = new RegExp(terms, 'i'); // RexExp(termino de busqueda, opcion :  i = insensible a minus o mayus)
		//buscamos por nombre
		//$or es una propiedad de mongo que nos permite establecer una condicion
		const queries = {
				$or: [{ name: regex }],
				$and: [{ status: true }]
			};
		const [total, products] = await Promise.all([// puedo crear una coleccion de promesas await para que sean un unico tiempo de carga y sea mas rapido el proceso
		//User.countDocuments({ status:true }),
		//User.find({ status:true }) // dentro del find({condicion}) podemos enviar las condiciones de busqueda
			Product.countDocuments(queries),
			Product.find(queries)
			.populate('user', 'name')
			.populate('category', 'name')]);
		if (total === 0 ) {
    	// statement
    	return res.status(404).json({
    		msg:'not found products'
    	});
    }
		/*const products = await Product.find({
			$or: [{ name: regex }],
			$and: [{ status: true }]
		})
		.populate('category', 'name')
		.populate('user', 'name');*/
		res.status(201).json({
			total,
			results: products
		})
		} catch(e) {
			// statements
			console.log(e);
		}
}

//General find
const find = (req = request, res = response) => {
	//desestructuramos colecciones y terminos de los params para realizar la busqueda
	const { collection, terms } = req.params;
	//verificamos si la coleccion que me llega de los params, se encuentra dentro de las permitidas
	if (!allowedCollections.includes(collection)) {
		// statement
		return res.status(400).json({
		msg: `The Allowed Collections are ${allowedCollections}`
	});
	}

	switch (collection) {
	
	case 'users':
	// statements_1
		findUser(terms, res);
		break;
	
	case 'categories':
	// statements_1
		findCategories(terms, res);
		break;
	
	case 'products':
	// statements_1
		findProducts(terms, res);
		break;
	
	default:
	// statements_def
		res.status(500).json({
		msg: `whats find`
	});
	}
}

//exports
module.exports = {
	find
}