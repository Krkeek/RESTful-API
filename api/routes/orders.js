const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Order = require('../models/order');
const Product = require('../models/product');


router.get('/',(req, res, next)=>{

    Order.find()
    .select('product quantity _id')
    .populate('product', 'name')
    .exec()
    .then(docs =>{
        res.status(200).json({
            count: docs.length,
            orders: docs.map(doc => {
                return {
                    _id: doc._id,
                    product: doc.product,
                    quantity: doc.quantity,
                    request: {
                        type: "GET",
                        url: "http://localhost:3000/orders/"+ doc._id
                    }
                }
            })



          
        })
    })
    .catch(err =>{
        res.status(500).json({})
    })


})

 router.post('/',async (req, res, next)=>{

    const productIsValid = await Product.findById(req.body.productId);
  
    if(productIsValid){
        const order = new Order({
            _id: new mongoose.Types.ObjectId(),
            quantity: req.body.quantity,
            product: req.body.productId
        })
    
        order.save()
        .then(result =>{
            res.status(201).json({
                message: "Order stored!"
    
            })
        })
        .catch(error =>{
            res.status(500).json(error)
        })
    }
    else {
     res.status(404).json({
        error: "Product not found!"
     })   
    }







})

router.get('/:orderId',(req, res, next)=>{
    Order.findById(req.params.orderId)
    .populate('product')
    .exec()
    .then(order =>{
        res.status(200).json({
            order: order
        })

    })
    .catch(err =>{
        res.status(500).json({
            error: err
        })
    })


    

})

router.delete('/:orderId',(req, res, next)=>{
    Order.deleteOne({_id: req.params.orderId})
    .exec()
    .then(response =>{
        res.status(200).json({
            message: "Order deleted!"
        })

    })
    .catch(err =>{
        res.status(500).json({
            error: err
        })
    })
   
    

})





module.exports = router;