var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var bookModel = new Schema({
	tittle : {
		type : String
	}
	// author : {type : String},
	// gener : {type : String},
	// read : {type : Boolean , default : false}

});

module.exports  = mongoose.model('book' , bookModel);

