const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const Cars = require('./models/productModel')
const cors = require('cors');

dotenv.config({ path: './.env' })
const app = express()
app.use(express.json())
app.use(cors({
    origin: 'http://localhost:3000'
}))




mongoose.connect(process.env.LOCAL_CON, {
    useNewUrlParser: true,
})
.then(() => console.log('DB Connected...'))
.catch(err => console.log('DB Connection Error: ', err))



const port = process.env.PORT || 5000

//CreateCar
app.post('/api/v1/car', async(req,res) => {
    console.log(req.body)
    try{
       const cars = await Cars.create(req.body)
       res.status(201).json({
           status: 'success',
           data: {
               cars
           }
       })
    }catch(err){
        res.status(404).json({
            status: 'fail',
            message: err.message
        })
    }
})

// getAllCar
app.get('/api/v1/car', async(req, res) => {
    try{
        const cars = await Cars.find()
        res.status(200).json({
        status: 'success',
        count: cars.length,
        data:{
        cars
        }
  })
    }catch(err){
        res.status(404).json({
            status: 'fail',
            message: err.message
        })
    }
  
}) 


// getCar
app.get('/api/v1/car/:id', async(req, res) => {
    try{
        const cars = await Cars.findById(req.params.id)
        res.status(200).json({
        status: 'success',
        data:{
        cars
        }})
    }
    catch(err){
        res.status(404).json({
            status: 'fail',
            message: err.message
        })
    }
})


// updateCar
app.patch('/api/v1/car/:id', async(req, res) => {
    try{
        const cars = await Cars.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        })
        res.status(200).json({
        status: 'success',
        data:{
        cars
        }})
    }
    catch(err){
        res.status(400).json({
            status: 'fail',
            message: err.message
        })
    }
})

// deleteCar

app.delete('/api/v1/car/:id', async(req, res) => {
    try{
        const cars = await Cars.findByIdAndDelete(req.params.id)
        res.status(204).json();
    }catch(err){
        res.status(404).json({
            status: 'fail',
            message: err.message
        })
    }
})




app.listen(port, () => {
    console.log(`listening on port ${port}`)
})