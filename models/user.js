const mongoose = require("mongoose");


const schema = {
    email: String, 
    password: String,
    type: String
   };

const userSchema = mongoose.Schema(schema);

module.exports = mongoose.model("Users",userSchema);
