'use strict';

const express=require('express');
const bcrypt=require('bcrypt');
const base64=require('base-64');

const router=express.Router();

const {UserModal} =require('../modules/index');
const {checkUser} =require('../middlewares/userAuth');




router.post('/signin',signin);
router.post('/signup',checkUser, signup);
router.get('/users',allUser);


/* istanbul ignore next */
async function signup(req,res){
try{
  const {username, email, password}=req.body;
  const userData={
    username, 
    email,
    password:await bcrypt.hash(password, 12),
  };
 
  const user=await UserModal.create(userData);
//   const newUser=await UserModal.findOne({where:{username:username}})
  if(user){
  res.status(201).json(user);   
  }
}catch(error){
    console.log(error);
}
}

/* istanbul ignore next */
async function signin(req,res){
    console.log(">>>>>>>>>>>>",req.headers.authorization.split(' ').pop())
    const header=req.headers.authorization.split(' ')
    const encoded=header.pop();
    const decoded=base64.decode(encoded);
    console.log(">>>>>>>",decoded.split(':'));
    console.log('Decoded',decoded);
    const [username, password]=decoded.split(':');

    const user=await UserModal.findOne({where:{username:username}});

    if(user){
        const isSame=await bcrypt.compare(password, user.password);
     console.log('smae', isSame);

        if(isSame){
            return res.status(200).json(user);
        }
        else{
            return res.status(401).send("you are not authorized");
        }
        
    }
    else{
        return res.status(401).send('Your password or username is not correct');
    }
}

/* istanbul ignore next */
async function allUser(req,res){
    const useres=await UserModal.findAll();
    res.status(200).json(useres)
}


module.exports=router;