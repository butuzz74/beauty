const { Schema, model } = require("mongoose");

const MassageSchema = new Schema(
  {
    type: {
      type: String
    },
    description: {
      type: String      
    },
    image: {
      type: String      
    },
  }, {timestamps: true}
);


module.exports = model("Massage", MassageSchema)
