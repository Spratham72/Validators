const express=require('express');

const {body,validationResult}=require('express-validator');
const { Mongoose } = require('mongoose');
const User=require('../model/user.model');
const router=express.Router();
router.post('/',body('first_name').notEmpty().withMessage("First Name is required"),
                body('last_name').notEmpty().withMessage("Last Name is required"),
                body('email').custom(value =>{if(!(value.includes('@'))||!(value.includes('.'))){
                    throw new Error('Email is not valid');
                }
                return true;
                }),
                body('pincode').isLength(6).withMessage("Pin code must be of 6 digits"),
                body('age').custom(value=>{if(value<1 ||value>100){
                    throw new Error('Age must be between 1 to 100 years old');
                }
                return true;
                }),
                body('gender').custom(value=>{if(value!=="male" && value!=="female"&& value!=="others"){
                    throw new Error('Gender should be either Male, Female or Others');
                }
                return true;
                }),
                async(req,res)=>{
                try {
                    const errors=validationResult(req);
                    if(!errors.isEmpty()){
                        return res.status(400).json({ errors: errors.array() });
                    }
                    const user= await User.create(req.body);
                    res.send(user)
                } catch (error) {
                    return res.status(500).json({status:"failed", message:error.message})
                }
            
})

router.get('/', async(req,res)=>{
    res.send("get")
})

module.exports=router;