//This is for document structure 
const mongoose= require("mongoose");

const riderSchema = mongoose.Schema({
    firtName: {
      type: String,
      required: false,
    },
    lastName: {
      type: String,
      required: false,
    },
    email:{
      type: String,
      required: false,
    }
    
  });

  const rider = mongoose.model("rider", riderSchema);
  module.exports = rider;