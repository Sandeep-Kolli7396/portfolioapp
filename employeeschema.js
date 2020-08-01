const mongoose = require('mongoose')

const EmployeeSchema =new mongoose.Schema({
    Name:String,
    Phone:String,
    Email:String,
    DOB:String,
    Position:String,
    Picture:String,
    AadharNumber:String,
})

mongoose.model("employee",EmployeeSchema)
