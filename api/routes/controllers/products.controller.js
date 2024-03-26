const Product = require('../models/product');


exports.products_get_all = (req, res, next)=>{

    Product.find()
    .select('name price _id')
    .exec()
    .then(docs =>{
        console.log(docs);

        const response = {
            count: docs.length,
            products: docs.map(doc =>{
                return{
                    name: doc.name,
                    _id:doc._id,
                    request:{
                        type: "GET",
                        url: "http://localhost:3000/products/" + doc._id
                    }
                }
                
            })


        }
        res.status(200).json(response)
    
    })
    .catch(err =>{
        res.status(500).json({
            error: err
        })
    })


}

exports.add_product = (req, res, next)=>{


    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    });

    product.save()
    .then((result)=>{
        res.status(201).json({
            messsage: 'Handling POST requests to /products',
            createdProduct: result 
    })

    })
    .catch((err)=>{
        console.log(err)
        res.status(500).json({
            error: err
        })
    });


}

exports.get_product_ById = (req, res, next)=>{

    const id = req.params.productId;
    Product.findById(id)
    .exec()
    .then((doc)=>{
        console.log(doc);
        if(doc){
            res.status(200).json({doc})
        }
        else {
            res.status(404).json({messsage: "No valid entry found for provided ID"})
        }

    
    })
    .catch((err)=>{
        console.log(err)
        res.status(500).json({error: err})

    })
    
}

exports.update_product = (req, res, next)=>{

    const id = req.params.productId;
    const updateOps = {};

    for (const ops of req.body){
        updateOps[ops.propName] = ops.value;

    }

    Product.updateOne({_id: id},{$set: updateOps })
    .exec()
    .then(result =>{
        res.status(200).json({result})

    })
    .catch(err =>{
        res.status(500).json({
            messsage: err
        })
    })
 
}

exports.delete_product = (req, res, next)=>{

    const id = req.params.productId;

    Product.deleteOne({_id: id })
    .exec()
    .then(result =>{
        res.status(200).json({
            messsage: result
        })
    })
    .catch(err =>{
        res.status(500).json({
            messsage: err
        })
    })


 
}