var mongoose = require("mongoose");
var bcrypt = require("bcryptjs");
var ObjectId = require("mongodb").ObjectId;

async function doConnect() {
	await mongoose.connect("mongodb://localhost/eez", {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true
	});
}

doConnect();

function parseResponse(response) {
	var json = JSON.stringify(response);
	var parsed = JSON.parse(json);
	return parsed;
}

const Orders = mongoose.model(
	"Orders",
	new mongoose.Schema({
			SellerID: { type: String },
			destAddress: { type: String },
			CC: { type: Number},
			status: {type: String},
			total: { type: String },
	})
);

module.exports.getAllOrders = (sID) => {
	return new Promise((resolve, reject) => {
		Orders.find({SellerID: sID}, (err, ords) => {
			var parsedProds = parseResponse(ords);
			if (!err) {
				resolve(parsedProds);
			} else {
				console.log("error:" + err);
				reject(err);
			}
		});
	});
};


module.exports.addOrder = (newSID, newAdd, newCC, newStatus, newTotal) => {
	return new Promise((resolve, reject) => {
		var Order1 = new Orders({ SellerID: newSID, destAddress: newAdd, CC: newCC, status: newStatus, total: newTotal });
		Order1.save(function(err, Order) {
			if (err) {
				reject(err);
			} else {
				resolve(Order);
			}
		});
	});
};
