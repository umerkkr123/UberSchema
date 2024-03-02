//This is for document structure 
const mongoose = require("mongoose");

const tripSchema = new mongoose.Schema({

  driver: { type: mongoose.Schema.ObjectId, ref: "driver" },
  rider: { type: mongoose.Schema.ObjectId, ref: "rider" },
  pickupLocation: {
    type: { type: String, enum: ['Point'], default: 'Point' },
    coordinates: { type: [Number], required: true }
  },
  dropoffLocation: {
    type: { type: String, enum: ['Point'], default: 'Point' },
    coordinates: { type: [Number], required: true }
  },
  fare: { type: Number, required: true },
  status: { type: String, enum: ['requested', 'accepted', 'ongoing', 'completed'], default: 'requested' }











  // tripID: {
  //   type: Number,
  //   required: false,
  // },
  // riderID: {
  //   type: String,
  //   required: false,
  // },
  // driverID:{
  //     type: Number,
  //     required: false,
  // },
  //                     paymentID:{
  //     type: Number,
  //     required: false,
  // },
  // timeStamp:{
  //     type: Number,
  //     required: false,
  // },
});
const trip = mongoose.model("trip", tripSchema);
module.exports = trip;