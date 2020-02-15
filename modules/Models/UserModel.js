var mongoose = require("mongoose");

const UserModel = mongoose.model(
	"user",
	new mongoose.Schema({
		email: {
			type: String,
			maxlength: 256,
			minlength: 4,
			required: true,
			unique: true
		},
		password: {
			type: String,
			minlength: 8
		},
		token: {
			type: String,
			default: ""
		},
		isVerified: {
			type: Boolean,
			required: true,
			default: false
		},
		isActive: {
			type: Boolean,
			required: true,
			default: false
		},
		businessName: {
			type: String,
			minlength: 2,
			maxlength: 64,
			required: true,
			default: "eEz Commerce Business"
		}
	})
);

module.exports = UserModel;