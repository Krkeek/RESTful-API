const express = require('express');
const router = express.Router();

router.get('/',(req, res, next)=>{
    res.status(200).json({
        messsage: 'Orders were fetched!'
    })

})

router.post('/',(req, res, next)=>{
    res.status(201).json({
        messsage: 'Order was created'
    })

})

router.get('/:orderId',(req, res, next)=>{
    res.status(200).json({
        messsage: 'Order details',
        orderId: req.params.orderId
    })
    

})

router.delete('/:orderId',(req, res, next)=>{
    res.status(200).json({
        messsage: 'Order deleted',
        orderId: req.params.orderId
    })
    

})





module.exports = router;