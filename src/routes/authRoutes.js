const express =require('express');   
const mongoose=require('mongoose')
const jwt=require('jsonwebtoken')
const User=mongoose.model('User');
console.log(jwt,"jwt")


const router = express.Router() ;

router.post('/signup', async (req,res)=>{
    try{
      const {email,password}=req.body;

      const user =new User({email,password});
      await user.save()

      const token= jwt.sign({userId: user._id } , 'my_secret_key')
      res.send({token})
    } catch (err) {
        return res.status(422).send(err.message)
    }

});
router.post('/signin',async(req,res)=>{
  const {email,password}=req.body;
  if(!email || !password){
    return res.status(422).send({error:"email must be entered"}) 
  }
  const user= await User.findOne({email});
  if(!user){
    return res.status(500).send({error:"invalid email and passwrd"})
  }

  try {
    
    await user.comparePassword(password)
    const token=jwt.sign({userId: user._id},'my_secret_key')
    
    res.send({token});
    
  }catch(err){
    return res.status(401).send({error:"invalid email or password",test:err.message})
  }

})
module.exports=router;