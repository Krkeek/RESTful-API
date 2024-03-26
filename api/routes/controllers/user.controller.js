const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose');


exports.user_sign_up = (req,res,next)=>{

    User.find({
        email: req.body.email
    })
    .exec()
    .then(user =>{
        if(user.length >= 1){
            return res.status(409).json({
                messsage: "User already exists"
            })
        }else {
    
            bcrypt.hash(req.body.password, 10,(err,hash) =>{
                if(err){
                    return res.status(500).json({
                        error: "Hash didn't work " + err
                    })
                }
                else{
        
                    const user = new User({
                        _id: new mongoose.Types.ObjectId,
                        email: req.body.email,
                        password: hash
                        });
                        
                        user.save()
                        .then(result =>{
                            res.status(201).json({
                                message: "User created!",
                            })
                        })
                        .catch(err =>{
                            res.status(500).json({
                                error: err
                            })
        
                        })
                    
                }
            })
    
    
        }
    })
    .catch()
    
    }

    exports.user_login = (req,res,next)=>{

        User.find({
            email: req.body.email,
        })
        .exec()
        .then(user =>{
            if(user.length < 1){
                res.status(401).json({
                    message: "Auth failed (user exists)"     
                })
            }
            else {
                bcrypt.compare(req.body.password, user[0].password,async (err, response)=>{
    
                    if(err){
                        res.status(401).json({
                            message: "Auth failed"
                        })
                    }
                    if(response) {
    
                        const token = jwt.sign({
                            email: user[0].email,
                            userId: user[0]._id,
                        },
                            process.env.JWT_KEY,
                            {
                                expiresIn: "1h"
                            });
    
                        res.status(200).json({
                            message: 'Auth successful',
                            token: token
                        })
          
                    }else {
                        res.status(401).json({
                            message: "Auth failed"
                        })
                    }
                
                })
        
        
    
            }
        })
        .catch(err =>{
            res.status(500).json({
                error: err
            })
        })
        

    }

    exports.delete_user = (req,res,next)=>{
        User.deleteOne({
            _id: req.params.userId
        })
        .exec()
        .then(result =>{
            res.status(200).json({
                message: "User deleted!"
            })
        })
        .catch(err =>{
            res.status(500).json({
                error: err
            })
        })
    
    }