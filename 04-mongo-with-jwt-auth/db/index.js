const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb+srv://itzsanchitkhosla:prPPAiRaN2nLaHLa@cluster0.mkahtsg.mongodb.net/course_selling_app_JWT');

// Define schemas
const AdminSchema = new mongoose.Schema({
    username:String,
    passwrd:String
});

const UserSchema = new mongoose.Schema({
    username:String,
    password:String,
    purchasedCourses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref : 'Course'
    }]
});

const CourseSchema = new mongoose.Schema({
    title:String,
    description:String,
    Url: String,
    price: Number
});

const Admin = mongoose.model('Admin', AdminSchema);
const User = mongoose.model('User', UserSchema);
const Course = mongoose.model('Course', CourseSchema);

module.exports = {
    Admin,
    User,
    Course
}