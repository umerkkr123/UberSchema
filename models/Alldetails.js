//This is for document structure 
const mongoose= require("mongoose");

const AlldetailsSchema = mongoose.Schema(
    {
    driverSchema:{
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
    },
    riderSchema:{
        firstName: {
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
    },   
    carSchema:{

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
    } 
    },

  );
  const Alldetails = mongoose.model("alldetails", AlldetailsSchema);
  module.exports = Alldetails;

  