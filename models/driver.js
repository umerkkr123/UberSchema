//This is for document structure 
const mongoose= require("mongoose");

const driverSchema = mongoose.Schema({
    firstName: {
      type: String,
      required: false,
    },
    lastName: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: false,
    },

  });
  const driver = mongoose.model("driver", driverSchema);
  module.exports = driver;