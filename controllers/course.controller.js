var Courses = require('../models/course.model.js');

module.exports.index = async (req, res) => {
    var courses = await Courses.find().lean();
    coursesRender = courses.map(function (item) {
        item._id = item._id.toString();
        return item;
    })

    if(req.query.searchName){
        coursesRender = coursesRender.filter(function(item) {
            if (item.name.match(req.query.searchName)) {
                return item;
            }
        });
    }

    if (req.query.sort === 'price_reduction') {
        coursesRender.sort(function (a, b) { return b.price - a.price });
    } else if (req.query.sort === 'price_increase') {

        coursesRender.sort(function (a, b) { return a.price - b.price });
    } 


    // coursesRender = coursesRender.filter(x => x.price < 130)
    res.render('courses.hbs', {
        // user: {
        //     sourse: "My Courses",
        // },
        title: 'All courses',
        courses: coursesRender,
        sort: req.query.sort,
    });
};

module.exports.detail = async (req, res) => {
    var courses = await Courses.find().lean();
    coursesRender = courses.map(function (item) {
        item._id = item._id.toString();
        return item;
    })

    if (req.params.page) {

        coursesRender = [coursesRender.find(x => x._id === req.params.page)];

    }


    // coursesRender = coursesRender.filter(x => x.price < 130)
    res.render('course-details.hbs', {
        user: {
            sourse: "My Courses",
        },
        title: 'All courses',
        course: coursesRender  
    });
};

module.exports.category = async (req, res) => {
    var courses = await Courses.find().lean();
    coursesRender = courses.map(function (item) {
        item._id = item._id.toString();
        return item;
    })
    console.log(req.params.page);
    if (req.params.page ) {
        coursesRender = coursesRender.filter(x => x.categoryId === req.params.page);
        //console.log( coursesRender);
    }
    if(req.query.category)
    {
        if (req.query.sort === 'price_reduction') {
            coursesRender.sort(function (a, b) { return b.price - a.price });
        } else if (req.query.sort === 'price_increase') {
    
            coursesRender.sort(function (a, b) { return a.price - b.price });
        } 
    }

    // coursesRender = coursesRender.filter(x => x.price < 130)
    res.render('courses.hbs', {
        user: {
            sourse: "My Courses",
        },
        title: req.params.page,
        courses: coursesRender,
        sortCategory: req.params.page
    });
};

module.exports.topic = async (req, res) => {
    var courses = await Courses.find().lean();
    coursesRender = courses.map(function (item) {
        item._id = item._id.toString();
        return item;
    })
    console.log(req.params.page);
    console.log(req.params.name);
    if (req.params.page ) {
        coursesRender = coursesRender.filter( x => x.categoryId === req.params.name);
        coursesRender = coursesRender.filter( x => x.topicId === req.params.page);
        
    }
    if(req.query.topic)
    {
        if (req.query.sort === 'price_reduction') {
            coursesRender.sort(function (a, b) { return b.price - a.price });
        } else if (req.query.sort === 'price_increase') {
    
            coursesRender.sort(function (a, b) { return a.price - b.price });
        } 
    }
    res.render('courses.hbs', {
        user: {
            sourse: "My Courses",
        },
        title: req.params.page,
        courses: coursesRender,
        sortCategory: req.params.name,
        sortTopic: req.params.page
    });
};

