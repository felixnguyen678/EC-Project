var Users = require('../models/user.model');
var Courses = require('../models/course.model.js');
var Topics = require('../models/topic.model');
const Teachers = require('../models/teacher.model');

module.exports.index = async (req, res) => {
    //====== count ========
    var studentsNumber = await Users.find().countDocuments().lean();
    var coursesNumber = await Courses.find().countDocuments().lean();
    var topics = await Topics.find().lean();
    var teachers = await Teachers.find().countDocuments().lean();
    //====== course detail =========
    var course_popular = await Courses.find().sort({'studentNumber': -1}).limit(3).lean();
    var course_favorite = await Courses.find().sort({'starNumber': -1}).limit(3).lean();
    
    var teacher_info;
	var teacher_array = [];
	for (var cou of course_popular)
	{
        teacher_info = await Teachers.findOne({ '_id':  cou.teacherId});
		teacher_array.push(teacher_info);
    };
    
	var teacher_info2;
	var teacher_array2 = [];
	for (var cou2 of course_favorite)
	{
        teacher_info2 = await Teachers.findOne({ '_id':  cou2.teacherId});
		teacher_array2.push(teacher_info2);
    }
    
    //====== trainer =====
    var trainer = await Teachers.aggregate(
        [ { $sample: { size: 3 } } ]
     );

    res.render('index.hbs', {
        studentsNum: studentsNumber,
        coursesNum: coursesNumber,
        all_topics: topics,
        trainer: teachers,
        courses_popular: course_popular,
        courses_favorite: course_favorite,
        teacher_pop: teacher_array,
        teacher_fav: teacher_array2,
        trainer_info: trainer
    });
};