//This is for document structure 
const mongoose= require("mongoose");

const carSchema = mongoose.Schema(
    {
        driverId:{
            type: mongoose.Schema.Types.ObjectId,
            auto: true
        },
        modelCar:{
            type:String,
            required:true,
           },
        regNo:{
              type:String,
              required:true,
          },
        createdAt:{
              type:Date,
              default:Date.now(),
          },
     },

  );
  const car = mongoose.model("car", carSchema);
  module.exports = car;

  