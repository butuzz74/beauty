const {Schema, model} = require("mongoose");

const OrderSchema = new Schema({
nick: {
    type: String
},
phone: {
    type: String
},
date: {
    type: String
},
massage: {
    type: String
},
serviceId: {
    type: Schema.Types.ObjectId,
    ref: "Massage"
},
userId: {
    type: Schema.Types.ObjectId,
    ref: "User"
}
}, {timestamps: true})

module.exports = model("Order", OrderSchema)