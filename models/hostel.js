const mongoose = require("mongoose");

const schema = { 
    name: String,
    city: String, 
    locality: String, 
    description: String, 
    location: String,
    landmarks: Array
 }

const hostelSchema = mongoose.Schema(schema);

module.exports = mongoose.model("Hostel",hostelSchema);
