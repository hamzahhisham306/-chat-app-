'use strict';


const {UserModal}=require('../modules/index');

/* istanbul ignore next */
async function checkUser(req,res,next){
    try{
        const username=await UserModal.findOne({where:{username:req.body.username}});
        
        if(username){
            return res.status(409).send('username already taken');
        }
        const emailUser=await UserModal.findOne({where:{email:req.body.email}});

        if(emailUser){
            return res.status(409).send('use another email because already taken');
        }
        next();


    }
    catch(error){
      console.log(error);
    }
}

module.exports={
    checkUser
}