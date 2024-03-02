const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const tripSchema = require("./models/trip");
const driverSchema = require("./models/driver");
const carSchema = require("./models/car");
const paymentSchema = require("./models/payment");
const driver = require("./models/driver");
const riderSchema = require("./models/rider.model");
const { faker } = require("@faker-js/faker");
const { MongoClient } = require('mongodb');
const AlldetailsSchema = require("./models/Alldetails");
//const Driverr = mongoose.model("drivers")


// Connect to MongoDB database
mongoose.connect("mongodb://127.0.0.1:27017/test", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("Connected to MongoDB"))
.catch((err) => console.error("Failed to connect to MongoDB", err));

// for creating server 
const app = express();
app.use(bodyParser.json());

const uri = 'mongodb://localhost:27017'; // MongoDB connection URI


//DriverApi

app.post('/insert/api', async(req,res)=>{
  console.log(req.body);
  try {
    const totalDocuments = 1000000; 
    for(let i=0; i<totalDocuments;i++){
      await driverSchema.create({ 
        firstName: faker.person.firstName(),
        lastName:faker.person.lastName(),
        email:faker.internet.email()
      });

    }
   res.status(200).send({
     message: "Driver created successfully",
   });
 } catch (err) {
   console.error("Error creating driver", err);
   res.status(500).send({
     message: "Failed to create driver",
     error: err.message,
   });
 }
 

})

//Api for Rider

app.post('/rider/api', async(req,res)=>{
  const totalDocuments =req.query.total;
  try{
    const totalDocuments = 18390;
    for(let i=0;i<totalDocuments;i++){
      await riderSchema.create({
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        email: faker.internet.email(),

      })
    }
    res.status(200).send({
      message: "rider created successfully",
    });
    
  }
  catch (err) {
    console.error("Error creating rider", err);
    res.status(500).send({
      message: "Failed to create a rider",
      error: err.message,
    });
  }
  
})

//Api for Car
const Driver = mongoose.model("driver")

app.post('/car/api', async(req,res)=>{
  const driverId = await Driver.find({});
  const getDriverId = driverId.map((val)=>val._id.toString()) 
  try{
    const totalDocuments = 1000000;
    for(let i=0;i<totalDocuments;i++){
      await carSchema.create({
        driverId: getDriverId[i],
        modelCar: faker.vehicle.model(),
        regNo: faker.vehicle.vin(),

      })
    }
    res.status(200).send({
      message: "Car added",
    });
    
  }
  catch (err) {
    console.error("Error creating car", err);
    res.status(500).send({
      message: "Failed to create a car",
      error: err.message,
    });
  }
  
})

//API For all details 

app.post('/alldetails/api', async(req,res)=>{
   
  try{
    const totalDocuments = 1000000;
    for(let i=0;i<totalDocuments;i++){
      await AlldetailsSchema.create({
                driverSchema:{
                  firstName:faker.person.firstName(),
                  lastName:faker.person.lastName(),
                  email:faker.internet.email(),
                },
                riderSchema:{
                  firstName:faker.person.firstName(),
                  lastName:faker.person.lastName(),
                  email:faker.internet.email(),
                },
                carSchema:{
                  modelCar:faker.vehicle.model(),
                  regNo:faker.vehicle.vin(),
                }

      })
    }
    res.status(200).send({
      message: "Successfully added",
    });
    
  }
  catch (err) {
    console.error("Error adding user", err);
    res.status(500).send({
      message: "Failed to create a user",
      error: err.message,
    });
  }
  
})

// Define API 
app.post("/api/insertData", async (req, res) => {
  console.log(req.body);
  //const {driverName, car} = req.body;
  // res.status(200).send({
  //   status:"success"
  // // })
  // try {
  //    await driverSchema.create({ driverName, car:{
  //     brand:car.brand,
  //     model:car.model,
  //     year:car.year,
  //   } });
  //   res.status(200).send({
  //     message: "Driver created successfully",
  //   });
  // } catch (err) {
  //   console.error("Error creating trip", err);
  //   res.status(500).send({
  //     message: "Failed to create trip",
  //     error: err.message,
  //   });
  // }
});

app.put("/drivers/:id", async(req, res)=>{
  const{id}=req.params;
  const{driverName}=req.body;
  console.log(req.body)
  try{
    const updatedDriver=await driver.findOneAndUpdate(
      {_id: id}, //filter find driver by id 
      {driverName,car},
      {new:true, upsert:true}
    );
    res.json(updatedDriver); //it will send the updated driver as response 

  }
  catch(error){
    res.status(500).json({error: error.message});
  }
})

app.post("/api/payment", async(req ,res)=>{
  console.log(req.body);
  try{
    const{amount, paymentMethod, status, timestamp}=req.body;
    if(!['credit card','paypal', 'cash'].includes(paymentMethod)){
      return res.status(400).json({message:"Invalid method"})
    }
    await paymentSchema.create({amount , paymentMethod , status, timestamp});
    res.status(200).send({
      message: "Payment made",
    });
  } catch(err){
    console.error("Error creating trip", err);
    res.status(500).send({
      message:"Failed to make payment",
      error: err.message,
    });
  }
  
});

//GetAggregated data

async function getAggregateData(req, res) {
  const { page, limit } = req.query;

  if (page && limit) {
    try {
      const details = await driver.aggregate([{ $lookup: { from: "cars", localField: "_id", foreignField: "driverId", as: "vehicleDetails" } }
        , { $skip: Number((page - 1) * limit) }, { $limit: Number(limit) }])
      res.status(200).json({
        total: details.length,
        data: details
      })
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.status(400).json({
      message: "Bad request."
    })
  }
}

//API for gettagregated data
app.get("/get/aggregateData", async (req, res)=>{
  getAggregateData(req,res)
})

//Embedded docs

async function getEmbeddedData(req,res){
  const { page, limit } = req.query
  if (page && limit) {
    const details = await AlldetailsSchema.find({}).skip((page - 1) * limit).limit(limit)
    res.status(200).json({
      total: details.length,
      data: details
    })
  } else {
    res.status(400).json({
      message: "Bad request."
    })
  }
}

//api embed

app.get("/get/embeddedData", async (req, res) => {
  getEmbeddedData(req,res)
})


// Start the server
app.listen(3004, () => {
  console.log("Server is running on Port 3004");
});