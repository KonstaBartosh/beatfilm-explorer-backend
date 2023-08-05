const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
		unique: true,
		validate: {
			validator: (value) => validator.isEmail(value),
			message: 'Некорректный формат электронного почты',
		},
	},
	password: {
		type: String,
		required: true,
		select: false,
	},
	name: {
		type: String,
		default: 'Жак-Ив Кусто',
		minlength: 2,
		maxlength: 30,
	},
});

const User = mongoose.model('user', userSchema);

module.exports = User;
