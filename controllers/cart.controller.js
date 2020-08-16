var Users = require('../models/user.model.js');
var Courses = require('../models/course.model.js');
const { use } = require('../routers/home.router.js');

module.exports.cart = async function(req, res) {
    var userId = req.signedCookies.userId;

    if(userId == undefined){
        res.redirect('/users/login');
        return;
    }

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

    var renderCourses = courses.map(function(item) {
        item.sale = parseInt(item.price) / 10;
        return item;
    })

    res.render('cart.hbs', {
        sale: total/10,
        total: total,
        courses: renderCourses,
    });
}

module.exports.postCart = async function(req, res) {
    var id = req.params.id;
    var userId = req.signedCookies.userId;

    var user = await Users.findById(
        {_id: userId}
    );
    
    var carts = user.carts;
    var flag = carts.indexOf(id);
    
    if(flag === -1){
        Users.findOneAndUpdate(
            {_id: userId},
            {
                "$push":
                    {
                        "carts": id
                    }
            }
            ).then(data => {
                    console.log(data);
            })
    }

    res.redirect('/courses');
};

module.exports.removeCourse = async function(req, res) {
    var id = req.params.id;
    var userId = req.signedCookies.userId;

    var user = await Users.findById(
        {_id: userId}
    );
    
    var carts = user.carts;
    carts = carts.filter(item => item !== id);
    
    user.carts = carts;
    await user.save();

    res.redirect('/cart');
}

// --> read
    // var user = await Users.findById(id).lean();
    // console.log(user);

    // --> update
    // Users.update(
    //     { "_id": "5f0590768ea4176c5804b230" },
    //     {
    //         "$push":
    //             {
    //                 "carts": "post"
    //             }
    //     }
    // ).then(data => {
    //     console.log(data);
    // })

    // --> create
    // var user = await Users.insertMany(
    //     [
    //         { name: "Scooby" },
    //         { age: 5 },
    //         { breed: "Great Dane" },
    //         { name: "Rambo" },
    //         { age: 2 },
    //         { breed: "Pitbull" },
    //         { name: "Johny boy" },
    //         { age: 3 },
    //         { breed: "German Shephard" }
    //     ],
    //         function(err, result) {
    //             if (err) {
    //                 res.send(err);
    //             } else {
    //                 res.send(result);
    //             }
    //         }
    //     )
    
    // --> delate
    // var user = await Users.findByIdAndDelete(id).lean();