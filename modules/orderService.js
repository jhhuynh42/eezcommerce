var mongoose = require("mongoose");
const Orders = require("./Models/OrderModel");

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

module.exports.getAllOrders = (sID, varStatus) => {		
	return new Promise((resolve, reject) => {
		var sort = {};
  		sort[varStatus] = -1;
			Orders.find({ SellerID: sID }, (err, ords) => {
			var parsedProds = parseResponse(ords);
			if (!err) {
				resolve(parsedProds);
			} else {
				console.log("error:" + err);
				reject(err);
			}
		}).sort(sort);
	});
};
/*sorting options
status: -1: Placed, Processed, Placed, Complete
total: -1: most to least
created_at: 1 - oldest to newest
*/

/*module.exports.SortOrder = (sID, SortPm) => {
	return new Promise((resolve, reject) => {
		var sortType = "";
			Orders.find({ SellerID: sID }, (err, ords) => {
			var parsedProds = parseResponse(ords);
			if (!err) {
				resolve(parsedProds);
			} else {
				console.log("error:" + err);
				reject(err);
			}
		}).sort({sortType});
	});
};*/


module.exports.getOrderById = oneId => {
	return new Promise((resolve, reject) => {
		Orders.findOne({ _id: oneId }, (err, ords) => {
			if (!err) {
				console.log(ords);
				resolve(ords);
			} else {
				console.log("error:" + err);
				reject(err);
			}
		});
	});
};
/*
module.expoert.updateOrderS = passed => {
	return new Promise((resolve, reject) => {
		Orders.updateOne({ _id: passed._id },{status: passed.status, updated_at: Date.now}, (err, result) => {
			if (err) {
				reject(err);
			} else {
				resolve(result);
			}
		});
	});
}*/
module.exports.addOrder = (newSID, newAdd, newCC, newStatus, newTotal, newPList) => {
	return new Promise((resolve, reject) => {
		var Order1 = new Orders({
			SellerID: newSID,
			destAddress: newAdd,
			CC: newCC,
			status: newStatus,
			total: newTotal,
			ProductList: newPList
		});
		Order1.save(function(err, Order) {
			if (err) {
				reject(err);
			} else {
				resolve(Order);
			}
		});
	});
};

module.exports.addOrder = (newSID, newAdd, newCC, newStatus, newTotal) => {
	return new Promise((resolve, reject) => {
		var Order1 = new Orders({
			SellerID: newSID,
			destAddress: newAdd,
			CC: newCC,
			status: newStatus,
			total: newTotal,
			ProductList: []
		});
		Order1.save(function(err, Order) {
			if (err) {
				reject(err);
			} else {
				resolve(Order);
			}
		});
	});
};
