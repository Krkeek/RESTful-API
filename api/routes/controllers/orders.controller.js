const Order = require('../models/order');


exports.order_get_all = (req, res, next)=>{
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
}

exports.add_order = async (req, res, next)=>{

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

}

exports.get_order_ById = (req, res, next)=>{
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
}

exports.delete_order = (req, res, next)=>{
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
   
    

}