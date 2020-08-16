const router = require('express').Router();
const courses = require('../models/course.model');
const Categories = require('../models/category.model');
const Topics=require('../models/topic.model');
const bodyParser = require('body-parser');
const urlencoded = bodyParser.urlencoded({extended:false});

router.get('/sanpham',(req,res)=>
{
    courses.find((err,doc)=>
    {
        if(!err)
        {
            res.render('listsanpham', { 
                  listsanpham:doc
        });
        }
    });
});
router.get('/sanpham/insert',(req,res)=>
{
    Topics.find((err,doc)=>
    {
        if(!err)
        {
            Categories.find((err1,doc1)=>
            {
                res.render("insertsanpham",{
                    topic:doc,
                    category:doc1
                })
            });
        }
    });
});


router.post('/sanpham/insert',urlencoded,async(req,res)=>
{
    const nameExists=await courses.findOne({name:req.body.Name});
    if(nameExists)
    {
        res.render('insertsanpham',
        {
            message:'Name is exists',
            type: 'alert danger'
        });
    }
    var SD=new Date(req.body.StartDate);
    const Courses = new courses(
        {
            name:req.body.Name,
            price:req.body.Price,
            image:req.body.Image,
            description:req.body.Description,
            studentNumber:req.body.StudentNumber,
            startDate:SD,
            starNumber:req.body.StarNumber,
            level:req.body.Level,
            reviewNumber:req.body.ReviewNumber,
            categoryId:req.body.CategoryId,
            topicId:req.body.TopicId,
            reviewId:null,
            techerId:null
        }
    );
    try{
        Courses.save();
        res.redirect("../sanpham");
    }
    catch(err)
    {
        res.status(400).send(err);
    }

});
router.get('/sanpham/sua/:_id',(req,res)=>
{
    courses.findOne({_id:req.params._id},(err,doc)=>
    {
        if(!err)
        {
            Categories.find((err1,doc1)=>{
                console.log(doc1);
                if(!err1)
                {
                    Topics.find((err2,doc2)=>{
                        res.render("updatesanpham",{
                            sp:doc,
                            spSD : doc.startDate.toISOString().substr(0,10),
                            category:doc1,
                            topic:doc2
                        });
                    });
                }
            });
        }
    })
});
router.post('/sanpham/sua/:_id',urlencoded,(req,res)=>
{
    var SD=new Date(req.body.StartDate);
    courses.findByIdAndUpdate({_id:req.body.ID},
        {
            name:req.body.Name,
            price:req.body.Price,
            image:req.body.Image,
            description:req.body.Description,
            studentNumber:req.body.StudentNumber,
            startDate:SD,
            starNumber:req.body.StarNumber,
            level:req.body.Level,
            reviewNumber:req.body.ReviewNumber,
            categoryId:req.body.CategoryId,
            topicId:req.body.TopicId,
            reviewId:null,
            techerId:null
        },(err,data)=>
        { 
            if(err)
            console.log(err);
        });
   res.redirect('../../sanpham');
});
router.get('/sanpham/xoa/:_id',(req,res)=>
{
    courses.findByIdAndDelete({_id:req.params._id},(err,doc)=>
    {
        if(err)
        console.log(err);
        else
        {
            res.redirect('../../sanpham');
        }
    });
});
module.exports=router;