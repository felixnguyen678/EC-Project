var paypal = require('paypal-rest-sdk');
var Users = require('../models/user.model.js');
var Courses = require('../models/course.model.js');
const { use } = require('../routers/home.router.js');

paypal.configure({
    'mode': 'sandbox', //sandbox or live
    // add 2 key nay vao dotenv nha
    'client_id': process.env.CLIENT_ID,
    'client_secret': process.env.CLIENT_SECRET
});

module.exports.payment = async function(req, res){
    var userId = req.signedCookies.userId;
    var user = await Users.findById(
        {_id: userId}
    );
    var carts = user.carts;
    var courses = [];
    var total = 0;

    for(var i = 0; i < carts.length; i++){
        var course = await Courses.findById({_id: carts[i]}).lean();
        total = total + parseInt(course.price);
        courses.push(course);
    }

    var items = [];
    
    for(var i = 0; i < courses.length; i++){
        var obj = {
            name: courses[i].name,
            sku: '001',
            price: parseFloat(courses[i].price)/10,
            currency: 'USD',
            quantity: 1
        };
        items.push(obj);
    }
    console.log(items);

    var amount = {
        currency: 'USD',
        total: total/10
    }

    var create_payment_json = {
        "intent": "sale",
        "payer": {
            "payment_method": "paypal"
        },
        "redirect_urls": {
            "return_url": "http://localhost:5000/payment/success",
            "cancel_url": "http://localhost:5000/payment/cancel"
        },
        "transactions": [{
            "item_list": {
                "items": items
            },
            "amount": amount,
            "description": userId
        }]
    };
    
    paypal.payment.create(create_payment_json, function (error, payment) {
        if (error) {
            throw error;
        } else {
            for (let link  = 0; link < payment.links.length; link++){
                if(payment.links[link].rel === 'approval_url'){
                    res.redirect(payment.links[link].href);
                }
            }
        }
    });
};

module.exports.success = async function(req, res) {
    var userId = req.signedCookies.userId;
    var user = await Users.findById(
        {_id: userId}
    );
    var carts = user.carts;
    var myCourses = user.courses;
    var courses = [];
    var total = 0;

    for(var i = 0; i < carts.length; i++){
        var course = await Courses.findById({_id: carts[i]}).lean();
        total = total + parseInt(course.price);
        myCourses.push(course._id);
        courses.push(course);
    }

    var amount = {
        currency: 'USD',
        total: total/10
    }

    const payerId = req.query.PayerID;
    const paymentId = req.query.paymentId;
    var execute_payment_json = {
        "payer_id": payerId,
        "transactions": [{
            "amount": amount
        }]
    };

    paypal.payment.execute(paymentId, execute_payment_json, async function (error, payment) {
        if (error) {
            console.log(error.response);
            throw error;
        } else {
            console.log(JSON.stringify(payment));
            user.carts = [];
            user.courses = myCourses;
            await user.save();

            res.redirect('/users/mycourses');
        }
    });
};

module.exports.cancel = async () => res.send('cancelled');
