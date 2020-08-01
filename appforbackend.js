const express = require('express')
const app= express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
require('./Employee')

app.use(bodyParser.json())

const Employee = mongoose.model("employee")

const mongoUri = "mongodb+srv://Admin:aKLotv6s4Emxy36r@cluster0-2kcvy.mongodb.net/test?retryWrites=true&w=majority"

mongoose.connect(mongoUri,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})

mongoose.connection.on("connected",()=>{
    console.log("Connected to mongodb")
})

mongoose.connection.on("error",(err)=>{
    console.log("error:",err)
})

app.get('/',(req,res)=>{
    Employee.find({}).then(data=>{
        res.send(data)
    }).catch(err=>{
        res.send("Oops an error found")
    })
})

app.post('/send-data',(req,res)=>{
        const employee = new Employee({
            Name:req.body.Name,
            Email:req.body.Email,
            Phone:req.body.Phone,
            DOB:req.body.DOB,
            Position:req.body.Position,
            Picture:req.body.Picture,
            AadharNumber:req.body.AadharNumber
        })
        employee.save()
        .then(data=>{
                console.log(data)
                res.send(data)
        }).catch(err=>{
            console.log("An error occured")
        })
        res.send('Posting successed')
})

app.post('/delete',(req,res)=>{
    Employee.findByIdAndDelete(req.body.id)
    .then(data=>{
        console.log(data)
        res.send(data)
    }).catch(err=>{
        console.log("Error")
    })
})

app.post('/update',(req,res)=>{
    Employee.findByIdAndUpdate(req.body.id,{
            Name:req.body.Name,
            Email:req.body.Email,
            Phone:req.body.Phone,
            DOB:req.body.DOB,
            Position:req.body.Position,
            Picture:req.body.Picture,
        }).then(data=>{
            console.log(data)
        res.send(data)
        }).catch(err=>{
            console.log("Error")
    })
})

//Employee.collection.remove()

app.listen(3000,()=>{
    console.log("server is running")
})

