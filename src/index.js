const express=require('express');
const app= express();
const mongoUri='mongodb+srv://abhayyadav:@cluster0.xewp9.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
app.get('/',(req,res)=>{
    res.send('hii abhay groot')

})
app.listen(3000,()=>{
    console.log('lestening on port 3000')
})