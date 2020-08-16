const router = require('express').Router();
const User = require('../models/user.model');
const bodyParser = require('body-parser');
 let dateFormat=require('dateformat');
 const md5 = require('md5');
const urlencoded = bodyParser.urlencoded({extended:false});
const image = "https://i.pinimg.com/736x/96/e5/97/96e597244825b3a6550eabb5e4a6c434.jpg";
router.get('/sinhvien',(req,res)=>
{
    User.find((err,docs)=>{
        if(!err)
        {
            for(let i in docs)
            {
                docs[i].date_DayofBirth=dateFormat(docs[i].DayofBirth,'dd/mm/yyyy');
            }
            res.render("list",{
                list:docs,
            });
        }
        else{
            console.log("don't retrieving user list");
        }
    });

});
router.get('/sinhvien/insert',(req,res)=>
{
    res.render("insert");
});
router.post('/sinhvien/insert',urlencoded,async(req,res)=>
{
    const userExists = await User.findOne({email : req.body.email});
    if(userExists) return res.render('insert',
    {
        message:'Email is exists',
        type: 'alert danger',
    });
    var hashpassword = md5(req.body.password);
    var DoB= new Date(req.body.Birthday);
    const user = new User(
        {
            name : req.body.fullname,
            email : req.body.email,
            password : hashpassword,
            phone:req.body.phonenumber,
            DayofBirth: DoB,
            image: image
        }
    );
    try{
        user.save();
        res.redirect("../sinhvien");
    }
    catch(err)
    {
        res.status(400).send(err);
    }
});
router.get('/sinhvien/sua/:email',(req,res) =>
{
    User.findOne({email:req.params.email},(err,doc)=>
    {
        if(!err)
        {
            res.render("update",{
                kh:doc,
                khDB : doc.DayofBirth.toISOString().substr(0,10)
            });
        }
    })
});
router.post('/sinhvien/sua/:email',urlencoded,(req,res)=>
{
    var DoB= new Date(req.body.Birthday);
   User.findOneAndUpdate({email:req.body.email},
    {
        name:req.body.fullname,
        email:req.body.email,
        image:req.body.image,
        DayofBirth:DoB,
        phone:req.body.phonenumber,

    },(err,data)=>
        { 
            if(err)
            console.log(err);
        }
   );
   res.redirect('../../sinhvien');
});
router.get('/sinhvien/xoa/:email',(req,res) =>
{
    User.findOneAndDelete({email:req.params.email},(err,doc)=>
    {
        if(err)
        console.log(err);
    });
    res.redirect("../../sinhvien");
});
module.exports=router;