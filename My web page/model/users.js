var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var userSchema   = new Schema({
	id: Number,
    fName: String,
    lName: String,
    title: String,
	sex: String,
	age: String
});

module.exports = mongoose.model('User', userSchema);