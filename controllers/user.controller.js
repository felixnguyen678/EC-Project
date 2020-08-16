const md5 = require('md5');
var Users = require('../models/user.model.js');
var Courses = require('../models/course.model.js');
const image = "https://i.pinimg.com/736x/96/e5/97/96e597244825b3a6550eabb5e4a6c434.jpg";

module.exports.login = async function(req, res) {
    res.render('login.hbs');
};

module.exports.register = async function(req, res) {
    res.render('register.hbs');
};

module.exports.mycourses = async function(req, res){
    var userId = req.signedCookies.userId;

    var user = await Users.findById(
        {_id: userId}
    );
    
    var courses = user.courses;
    var myCourses = [];

    for(var i = 0; i < courses.length; i++){
        var course = await Courses.findById({_id: courses[i]}).lean();
        myCourses.push(course);
    }

    res.render('mycourses.hbs',{
        courses: myCourses
    });
}

module.exports.postLogin = async function(req, res) {
    var email = req.body.email;
    var password = md5(req.body.password);

    var user = await Users.findOne({"email": email})
    
    if(!user) {
        res.render('login.hbs', {
            errors: [
                'User does not exist.'
            ],
            values: req.body
        })
        return;
    }

    if(user.password != password) {
        res.render('login.hbs', {
            errors: [
                'Wrong password'
            ],
            values: req.body
        })
        return;
    }
    console.log(user);
    res.cookie('userId', user._id, {
        signed: true
    });
    res.redirect('/courses');
}

module.exports.postRegister = async function(req, res) {
    var name = req.body.name;
    var email = req.body.email;
    var password = req.body.password;
    var confirmPassword = req.body.confirmPassword;

    var errors = [];
    if(name == '') {
        errors.push('Empty name');
    }
    if(email == '') {
        errors.push('Empty email')
    }
    if(password == '' || password.length < 6) {
        errors.push('Password is not enough 6 characters')
    }
    if(confirmPassword != password) {
        errors.push('Confirm password is not valid')
    }

    if(errors.length > 0) {
        res.render('register.hbs', {
            errors: errors,
            values: req.body
        })
        return;
    }

    var savePass =  md5(password);
    var DoB= new Date(req.body.Birthday);
    var user = new Users(
        {   
            name: name,
            password: savePass,
            image: image,
            email: email,
            phone: req.body.phonenumber,
            DayofBirth:DoB,
            carts: [],
        }
    );
    user.save(function(err, user){
        if(err){
            return console.log(err);
        }
        else {
            res.redirect('/users/login');
        }
    })
}